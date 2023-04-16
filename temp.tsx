import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { sendTransaction } from './transaction';


export default function App() {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');

  const handleSendTransaction = async () => {
    console.log(amount,address)
    try {
      const receipt = await sendTransaction((address), amount);
      setTransactionHash(receipt.transactionHash);
      setTransactionMessage('Transaction successful!');
    } catch (error) {
      console.error(error);
      setTransactionHash('');
      setTransactionMessage('Transaction failed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Transaction Amount in ETH:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        keyboardType="decimal-pad"
      />
      <Text style={styles.label}>Receiver's Address:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAddress}
        value={address}
      />
      <TouchableOpacity style={styles.button} onPress={handleSendTransaction}>
        <Text style={styles.buttonText}>Send Transaction</Text>
      </TouchableOpacity>
      {!!transactionHash && (
        <>
          <Text style={styles.label}>Transaction Hash:</Text>
          <Text style={styles.transactionHash}>{transactionHash}</Text>
          <Text style={styles.transactionMessage}>{transactionMessage}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionHash: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  transactionMessage: {
    color: '#007AFF',
    fontSize: 16,
  },
});