/*********************************************************
 * single-file: PincodeSearchScreen.js
 * - Copy & paste this whole file into your React Native project.
 * - No external deps required (uses built-in fetch + AbortController).
 * - Debouncing implemented with a small hook (no lodash needed).
 *
 * ✅ What this file contains (easy, beginner-friendly):
 *  1) A runnable React Native screen component: PincodeSearchScreen
 *  2) A small `useDebouncedValue` hook (debounces input)
 *  3) An API caller that uses AbortController to cancel inflight requests
 *  4) Loading / error / results UI using FlatList
 *  5) Small performance tips in comments
 *
 * Paste this file into your project (e.g., screens/PincodeSearchScreen.js)
 * then import into your navigator:
 *   import PincodeSearchScreen from './screens/PincodeSearchScreen';
 *
 *********************************************************/

import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

/*********************************************************
 * CONFIG
 *********************************************************/
const DEBOUNCE_DELAY = 500; // ms - how long to wait after user stops typing
const PINCODE_LENGTH = 6;

/*********************************************************
 * useDebouncedValue Hook
 * - Returns a debounced version of a value
 * - Built with setTimeout + cleanup (no external lib)
 *********************************************************/
function useDebouncedValue(value, delay = DEBOUNCE_DELAY) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(value);
    }, delay);

    // cleanup - if value changes before delay, cancel previous timer
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

/*********************************************************
 * PincodeSearchScreen Component
 *********************************************************/
export default function PincodeSearchScreen() {
  /********************************************
   * State
   ********************************************/
  const [pincode, setPincode] = useState(''); // user input string
  const [data, setData] = useState([]); // PostOffice array from API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastQueried, setLastQueried] = useState(''); // last pincode we requested (for UI)
  const abortControllerRef = useRef(null); // store AbortController to cancel fetches

  /********************************************
   * Derived state
   ********************************************/
  const isValidPincode = useMemo(() => pincode.length === PINCODE_LENGTH, [pincode]);

  // debouncedPincode updates only after user stops typing for DEBOUNCE_DELAY ms
  const debouncedPincode = useDebouncedValue(pincode, DEBOUNCE_DELAY);

  /********************************************
   * fetchPincodeData
   * - Uses fetch with AbortController
   * - Cancels previous inflight request before starting a new one
   ********************************************/
  const fetchPincodeData = useCallback(async (pin) => {
    // Basic guard
    if (!pin || pin.length !== PINCODE_LENGTH) return;

    // Cancel previous fetch if exists
    if (abortControllerRef.current) {
      try {
        abortControllerRef.current.abort();
      } catch (e) {
        // ignore
      }
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError('');
    setData([]);
    setLastQueried(pin);

    const url = `https://api.postalpincode.in/pincode/${pin}`;

    try {
      const res = await fetch(url, { signal: controller.signal, method: 'GET' });
      // if response is aborted, fetch will throw; that will go to catch
      if (!res.ok) {
        throw new Error(`Network error: ${res.status}`);
      }
      const json = await res.json();

      const result = json?.[0];
      if (!result || result.Status !== 'Success' || !Array.isArray(result.PostOffice)) {
        setError('No data found for this pincode.');
        setData([]);
        return;
      }

      // set results
      setData(result.PostOffice);
    } catch (err) {
      // If request was aborted, don't show an error to user.
      if (err.name === 'AbortError') {
        // aborted — do nothing meaningful
        // console.log('Fetch aborted for pincode', pin);
      } else {
        console.log('fetchPincodeData error:', err);
        setError('Something went wrong. Please try again.');
      }
      setData([]);
    } finally {
      // If current controller is this controller, clear it
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
      setLoading(false);
    }
  }, []);

  /********************************************
   * Effect: when debouncedPincode changes, call API
   ********************************************/
  useEffect(() => {
    // Only call when debounced value is a valid pincode
    if (debouncedPincode && debouncedPincode.length === PINCODE_LENGTH) {
      fetchPincodeData(debouncedPincode);
    } else {
      // if user deletes digits: clear states
      setData([]);
      setError('');
      setLastQueried('');
      // cancel any inflight fetch
      if (abortControllerRef.current) {
        try {
          abortControllerRef.current.abort();
        } catch (e) {}
        abortControllerRef.current = null;
      }
      setLoading(false);
    }

    // cleanup on unmount handled separately below
  }, [debouncedPincode, fetchPincodeData]);

  /********************************************
   * Cleanup on unmount: abort any inflight fetch
   ********************************************/
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        try {
          abortControllerRef.current.abort();
        } catch (e) {}
        abortControllerRef.current = null;
      }
    };
  }, []);

  /********************************************
   * renderItem + keyExtractor
   * - useCallback to avoid re-creating on every render
   ********************************************/
  const renderItem = useCallback(({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.officeName}>{item.Name}</Text>
        <Text style={styles.text}>Branch Type: {item.BranchType}</Text>
        <Text style={styles.text}>Delivery Status: {item.DeliveryStatus}</Text>
        <Text style={styles.text}>District: {item.District}</Text>
        <Text style={styles.text}>State: {item.State}</Text>
        <Text style={styles.text}>Pincode: {item.Pincode}</Text>
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item, index) => `${item.Pincode}-${item.Name}-${index}`, []);

  /********************************************
   * Small helpers / UI actions
   ********************************************/
  const onClear = () => {
    setPincode('');
    setData([]);
    setError('');
    setLastQueried('');
    // cancel inflight
    if (abortControllerRef.current) {
      try {
        abortControllerRef.current.abort();
      } catch (e) {}
      abortControllerRef.current = null;
    }
  };

  const onSubmitEditing = () => {
    // when user presses done on keyboard, if valid invoke immediate fetch (no extra debounce wait)
    if (pincode.length === PINCODE_LENGTH) {
      // cancel existing debounce timer effect by setting debounced value indirectly:
      // easiest: call fetch directly (it handles aborting previous requests)
      Keyboard.dismiss();
      fetchPincodeData(pincode);
    }
  };

  /********************************************
   * UI
   ********************************************/
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🔎 Pincode Search (Debounced)</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter 6-digit Indian pincode"
        value={pincode}
        onChangeText={(t) => {
          // allow only digits
          const onlyDigits = t.replace(/[^0-9]/g, '');
          setPincode(onlyDigits);
        }}
        keyboardType="number-pad"
        maxLength={PINCODE_LENGTH}
        returnKeyType="search"
        onSubmitEditing={onSubmitEditing}
      />

      <View style={styles.row}>
        <Text style={styles.helper}>
          Type a 6-digit pincode. API auto-calls after {DEBOUNCE_DELAY} ms of inactivity.
        </Text>
        <TouchableOpacity onPress={onClear} style={styles.clearBtn}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Fetching details for {lastQueried}...</Text>
        </View>
      )}

      {!loading && error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {!loading && !error && isValidPincode && data.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.infoText}>No results found for {debouncedPincode || pincode}.</Text>
        </View>
      ) : null}

      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={data.length === 0 ? styles.flatEmpty : styles.listContent}
        ListEmptyComponent={
          <View style={styles.center}>
            {!isValidPincode ? (
              <Text style={styles.infoText}>Enter full 6-digit pincode to see results.</Text>
            ) : null}
          </View>
        }
      />

      {/* Small footer / cheat */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>API: https://api.postalpincode.in/pincode/{'{pincode}'}</Text>
      </View>
    </SafeAreaView>
  );
}

/*********************************************************
 * Styles
 *********************************************************/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  helper: {
    marginTop: 8,
    fontSize: 12,
    color: '#444',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearBtn: {
    padding: 8,
    marginLeft: 8,
  },
  clearText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  center: {
    marginTop: 16,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
  },
  errorText: {
    marginTop: 12,
    color: 'red',
    fontSize: 14,
  },
  infoText: {
    marginTop: 12,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: 16,
  },
  flatEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  officeName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    marginTop: 2,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 8,
    marginTop: 8,
  },
  footerText: {
    fontSize: 11,
    color: '#666',
  },
});

/*********************************************************
 * QUICK NOTES / CHEAT-SHEET (plain language)
 *
 * - Debounce: Wait a little after user stops typing before calling API.
 * - AbortController: Cancel old API calls when a new one starts (saves data & race conditions).
 * - Early guards: Only call API when we have exactly 6 digits.
 * - No external libraries: This example uses built-in fetch and a tiny debounced hook.
 *
 * Possible improvements (advanced):
 * - Use axios with AbortController or its cancel token if you prefer axios.
 * - Use a shared cache (memory) so repeated pincodes return instantly without network.
 * - Add retry logic with exponential backoff for poor connections.
 * - Add E2E / unit tests around the hook and the component (React Native Testing Library).
 *
 *********************************************************/
