import React from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import MotorcycleForm from '../components/MotorcycleForm';

type EditFormData = {
  model: string;
  plate: string;
  lastRevisionDate: string;
  engineType: string;
};

type Props = {
  visible: boolean;
  loading: boolean;
  formData: EditFormData;
  setFormData: (fd: EditFormData) => void;
  onCancel: () => void;
  onSave: () => void;
};

export default function EditMotorcycleModal({ visible, loading, formData, setFormData, onCancel, onSave }: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>Editar Moto</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#32CD32" style={{ marginVertical: 20 }} />
            ) : (
              <>

                <MotorcycleForm formData={formData} setFormData={setFormData} styles={styles} showSpotId={false} />

                <View style={styles.modalButtons}>
                  <TouchableOpacity style={[styles.modalButton, styles.cancelModalButton]} onPress={onCancel}>
                    <Text style={styles.modalButtonText}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.modalButton, styles.saveModalButton]} onPress={onSave}>
                    <Text style={styles.modalButtonText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    maxHeight: "80%",
    width: "90%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#32CD32",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#32CD32",
    backgroundColor: "#F8F8F8",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    color: "#000",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#32CD32",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 4,
    marginBottom: 16,
    borderRadius: 8,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelModalButton: {
    backgroundColor: "#B22222",
  },
  saveModalButton: {
    backgroundColor: "#32CD32",
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

