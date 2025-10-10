import { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { useThemeContext } from "../contexts/ThemeContext";
import { useFocusEffect, useRouter } from "expo-router";
import { deleteMotorcycle, findMotorcycles, getMotorcycleById, Motorcycle, updateMotorcycle } from "../api/motos";

export default function ListaMotos() {
  const { colors } = useThemeContext();
  const [motos, setMotos] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  // Estados para o modal de edição
  const [modalVisible, setModalVisible] = useState(false);
  const [editandoMoto, setEditandoMoto] = useState<Motorcycle | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    model: "",
    plate: "",
    lastRevisionDate: "",
    engineType: "",
  });

  const router = useRouter();

  const deletarMoto = async (id: number) => {
    try {
      const novasMotos = motos.filter((moto) => moto.id !== id);
      await deleteMotorcycle(id);
      setMotos(novasMotos);
      Alert.alert("Sucesso", "Moto deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar moto:", error);
    }
  };

  const confirmarDeletarMoto = (id: number) =>
    Alert.alert("Confirmar exclusão", "Deseja excluir esta moto?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => deletarMoto(id) },
    ]);

  const abrirModalEdicao = async (moto: Motorcycle) => {
    try {
      setLoadingModal(true);
      setModalVisible(true);
      setEditandoMoto(moto);
      
      const motoCompleta = await getMotorcycleById(moto.id);
      
      setEditFormData({
        model: motoCompleta.model || "",
        plate: motoCompleta.plate || "",
        lastRevisionDate: motoCompleta.lastRevisionDate,
        engineType: motoCompleta.engineType?.toString() || "",
      });
    } catch (error) {
      console.error("Erro ao carregar dados da moto:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados da moto.");
      setModalVisible(false);
    } finally {
      setLoadingModal(false);
    }
  };

  const salvarEdicao = async () => {
    if (!editFormData.model || !editFormData.plate) {
      Alert.alert("Erro", "Modelo e placa são obrigatórios.");
      return;
    }

    if (!editandoMoto) return;

    const lastRevisionDate = editFormData.lastRevisionDate ? new Date(editFormData.lastRevisionDate).toISOString() : new Date().toISOString();

    try {
      setLoadingModal(true);

      await updateMotorcycle(
        editandoMoto.id,
        {
          ...editandoMoto,
          ...editFormData,
          lastRevisionDate
        }
      );

      Alert.alert("Sucesso", "Moto editada com sucesso!");
      setModalVisible(false);
      carregarMotos(pagina); // Recarregar a lista
    } catch (error) {
      Alert.alert("Erro", "Não foi possível editar a moto.");
      console.error(error);
    } finally {
      setLoadingModal(false);
    }
  };

  const fecharModal = () => {
    setModalVisible(false);
    setEditandoMoto(null);
    setEditFormData({
      model: "",
      plate: "",
      lastRevisionDate: "",
      engineType: "",
    });
  };

  const carregarMotos = async (page = 1) => {
    setLoading(true);
    try {
      const resposta = await findMotorcycles(page, 5);
      let lista = [];
      let totalPages = 1;

      if (resposta && resposta.items) {
        lista = resposta.items;
        totalPages = resposta.totalPages || 1;
      } else if (Array.isArray(resposta)) {
        // Se a API retornar array direto
        lista = resposta;
        totalPages = 1;
      } else {
        console.warn("Estrutura de resposta inesperada:", resposta);
        lista = [];
      }
      
      setTotalPaginas(totalPages);

      const motosFormatadas: Motorcycle[] = lista.map((m: Motorcycle) => ({
        id: m.id,
        model: m.model,
        plate: m.plate,
        spotId: m.spotId,
        lastRevisionDate: m.lastRevisionDate,
        engineType: m.engineType,
      }));
      setMotos(motosFormatadas);
    } catch (error) {
      console.error("Erro ao carregar motos:", error);
      setMotos([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarMotos(pagina);
    }, [pagina])
  );

  const MotoItem = ({ moto }: { moto: Motorcycle }) => (
    <View style={styles.item}>
      <Text style={styles.text}>🏍️ Modelo: {moto.model}</Text>
      <Text style={styles.text}>📄 Placa: {moto.plate}</Text>
      <Text style={styles.text}>📍 Spot ID: {moto.spotId}</Text>
      <Text style={styles.text}>🗓 Última Revisão: {moto.lastRevisionDate}</Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
        <TouchableOpacity
          style={[styles.smallButton, { backgroundColor: "#1E90FF" }]}
          onPress={() => abrirModalEdicao(moto)}
        >
          <Text style={styles.smallButtonText}>✏️ Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.smallButton, { backgroundColor: "#B22222" }]}
          onPress={() => confirmarDeletarMoto(moto.id)}
        >
          <Text style={styles.smallButtonText}>🗑️ Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ActionButton = ({
    text,
    onPress,
    style,
    textStyle,
  }: {
    text: string;
    onPress: () => void;
    style?: object;
    textStyle?: object;
  }) => (
    <TouchableOpacity style={[styles.actionButton, style]} onPress={onPress}>
      <Text style={[styles.actionButtonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.title}>Lista de Motos Cadastradas</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.input} />
      ) : motos.length === 0 ? (
        <Text style={styles.info}>Nenhuma moto cadastrada ainda.</Text>
      ) : (
        <FlatList
          data={motos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MotoItem moto={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {!loading && (
        <>
          {/* Botões de paginação */}
          <View style={styles.paginationContainer}>
            <Text style={styles.paginationInfo}>
              Página {pagina} de {totalPaginas}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: pagina <= 1 ? "#666" : "#1E90FF", flex: 1, marginRight: 5 }
              ]}
              onPress={() => {
                if (pagina > 1) {
                  setPagina(pagina - 1);
                }
              }}
            >
              <Text style={[styles.actionButtonText, { fontWeight: "bold" }]}>⬅️ Anterior</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: pagina >= totalPaginas ? "#666" : "#32CD32", flex: 1, marginLeft: 5 }
              ]}
              onPress={() => {
                if (pagina < totalPaginas) {
                  setPagina(pagina + 1);
                }
              }}
            >
              <Text style={[styles.actionButtonText, { fontWeight: "bold" }]}>Próxima ➡️</Text>
            </TouchableOpacity>
          </View>

          {/* Botões adicionais */}
          <View style={styles.buttonContainer}>
            <ActionButton
              text="🚗 Ir para o Pátio"
              onPress={() => router.push("/patios")}
              style={{ backgroundColor: "#1E90FF", flex: 1, marginRight: 5 }}
            />
            <ActionButton
              text="🏍️ Cadastrar Nova Moto"
              onPress={() => router.push("/cadastroMoto")}
              style={{ backgroundColor: "#32CD32", flex: 1, marginLeft: 5 }}
            />
          </View>
        </>
      )}

      {/* Modal de Edição */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Editar Moto</Text>
              
              {loadingModal ? (
                <ActivityIndicator size="large" color="#32CD32" style={{ marginVertical: 20 }} />
              ) : (
                <>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Modelo da moto"
                    placeholderTextColor="#666"
                    value={editFormData.model}
                    onChangeText={(text) => setEditFormData({ ...editFormData, model: text })}
                  />
                  
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Placa da moto"
                    placeholderTextColor="#666"
                    value={editFormData.plate}
                    onChangeText={(text) => setEditFormData({ ...editFormData, plate: text })}
                  />
                  
                  
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Data da última revisão (dd/mm/aaaa)"
                    placeholderTextColor="#666"
                    value={editFormData.lastRevisionDate}
                    onChangeText={(text) => setEditFormData({ ...editFormData, lastRevisionDate: text })}
                  />
                  
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Tipo de motor (0,1)"
                    placeholderTextColor="#666"
                    value={editFormData.engineType}
                    onChangeText={(text) => setEditFormData({ ...editFormData, engineType: text })}
                    keyboardType="numeric"
                  />
                  
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.cancelModalButton]}
                      onPress={fecharModal}
                    >
                      <Text style={styles.modalButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[styles.modalButton, styles.saveModalButton]}
                      onPress={salvarEdicao}
                    >
                      <Text style={styles.modalButtonText}>Salvar</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
    color: "#7CFC00",
  },
  item: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#7CFC00",
  },
  text: { fontSize: 16, color: "#FFF", marginBottom: 4 },
  info: { textAlign: "center", color: "#888", fontSize: 16 },
  smallButton: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
  },
  smallButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  actionButton: {
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  actionButtonText: { fontSize: 16, color: "#FFF", fontWeight: "bold" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  paginationContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  paginationInfo: {
    color: "#7CFC00",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Estilos do Modal
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
