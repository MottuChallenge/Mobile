import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Platform } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { transformDateFormatToBR } from '../utils/transformDateFormatToBR';

type FormData = {
  model: string;
  plate: string;
  spotId?: string;
  lastRevisionDate: string;
  engineType: string;
};

type Props = {
  formData: FormData;
  setFormData: (fd: FormData) => void;
  styles: any;
  showSpotId?: boolean;
};

export default function MotorcycleForm({ formData, setFormData, styles, showSpotId = true }: Props) {
  const openDatePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: formData.lastRevisionDate ? new Date(formData.lastRevisionDate) : new Date(),
        onChange: (event, selectedDate) => {
          if (event && (event as any).type === 'dismissed') return;
          if (selectedDate) {
            const yyyy = selectedDate.getFullYear();
            const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const dd = String(selectedDate.getDate()).padStart(2, '0');
            setFormData({ ...formData, lastRevisionDate: `${yyyy}-${mm}-${dd}` });
          }
        },
        mode: 'date',
        maximumDate: new Date(),
      });
    } else {
      if (!formData.lastRevisionDate) {
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        setFormData({ ...formData, lastRevisionDate: `${yyyy}-${mm}-${dd}` });
      }
    }
  };

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Modelo da moto"
        placeholderTextColor="#000"
        value={formData.model}
        onChangeText={(text) => setFormData({ ...formData, model: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Placa da moto (ABC-1234)"
        placeholderTextColor="#000"
        value={formData.plate}
        onChangeText={(text) => setFormData({ ...formData, plate: text })}
      />

      {showSpotId && (
        <TextInput
          style={styles.input}
          placeholder="Spot ID (opcional)"
          placeholderTextColor="#000"
          value={formData.spotId}
          onChangeText={(text) => setFormData({ ...formData, spotId: text })}
        />
      )}

      <TouchableOpacity style={[styles.input, { justifyContent: 'center' }]} onPress={openDatePicker}>
        <Text>{formData.lastRevisionDate ? transformDateFormatToBR(formData.lastRevisionDate) : 'Data da última revisão'}</Text>
      </TouchableOpacity>

      <View style={[styles.input, { padding: 0 }]}>
        <Picker
          selectedValue={formData.engineType}
          onValueChange={(value) => setFormData({ ...formData, engineType: String(value) })}
          style={{ color: '#000', width: '100%' }}
          itemStyle={{ color: '#000' }}
          mode="dropdown"
          dropdownIconColor="#32CD32"
        >
          <Picker.Item label="Combustão" value="0" />
          <Picker.Item label="Elétrico" value="1" />
        </Picker>
      </View>
    </>
  );
}
