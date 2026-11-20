import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import {
  setAwsAuthCredentials,
  clearAwsAuthCredentials,
  startLiveness,
  cancelLiveness,
} from 'react-native-aws-face-liveness';

interface PinCodeApiIntegrationProps {
  navigation: NavigationProp<ParamListBase>;
  route: Record<string, any | undefined>;
}

export const PinCodeApiIntegration = ({
  navigation,
}: PinCodeApiIntegrationProps) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Ready to test');

  const handleStartLiveness = async () => {
    try {
      setLoading(true);
      setStatus('Setting temporary AWS credentials...');

      // Replace these placeholders with temporary credentials
      // returned securely by your backend.
      await setAwsAuthCredentials({
        accessKeyId: 'YOUR_TEMPORARY_ACCESS_KEY',
        secretAccessKey: 'YOUR_TEMPORARY_SECRET_KEY',
        sessionToken: 'YOUR_TEMPORARY_SESSION_TOKEN',
        expiration: Date.now() + 5 * 60 * 1000,
      });

      setStatus('Starting face liveness...');

      // Your backend should create this session using AWS.
      const result = await startLiveness({
        sessionId: 'YOUR_BACKEND_SESSION_ID',
        region: 'ap-south-1',
        disableStartView: true,
      });

      setStatus(`Liveness UI completed: ${result.completed}`);

      Alert.alert(
        'Liveness UI finished',
        'Verify the session result with your backend before treating the user as verified.',
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      setStatus(`Error: ${message}`);
      Alert.alert('Liveness error', message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      await cancelLiveness();
      setStatus('Liveness cancelled');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : String(error));
    }
  };

  const handleClearCredentials = () => {
    clearAwsAuthCredentials();
    setStatus('Credentials cleared');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{ marginTop: 16 }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        Go Back
      </Text>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>AWS Face Liveness</Text>

        <Text style={styles.description}>
          Test your React Native native module.
        </Text>

        <View style={styles.statusBox}>
          {loading && <ActivityIndicator size="small" />}
          <Text style={styles.status}>{status}</Text>
        </View>

        <View style={styles.button}>
          <Button
            title={loading ? 'Starting...' : 'Start Face Liveness'}
            onPress={handleStartLiveness}
            disabled={loading}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Cancel Liveness"
            onPress={handleCancel}
            disabled={!loading}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Clear Credentials"
            onPress={handleClearCredentials}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  statusBox: {
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  status: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  button: {
    width: '100%',
    marginBottom: 12,
  },
});
