import { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import { useThemeContext } from "../contexts/ThemeContext";
import { useFocusEffect, useRouter } from "expo-router";
import {
  deleteMotorcycle,
  findMotorcycles,
  getMotorcycleById,
  Motorcycle,
  PaginatedMotorcycles,
  updateMotorcycle
} from "../api/motos";
import EditMotorcycleModal from "../components/EditMotorcycleModal";
import { useTranslation } from "react-i18next";

export default function ListaMotos() {
  const { colors } = useThemeContext();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [motorcyclePagination, setMotorcyclePagination] =
    useState<PaginatedMotorcycles | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [editandoMoto, setEditandoMoto] = useState<Motorcycle | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    model: "",
    plate: "",
    lastRevisionDate: "",
    engineType: 0
  });

  const router = useRouter();

  const deletarMoto = async (id: number) => {
    try {
      await deleteMotorcycle(id);
      Alert.alert(t("listaMotos.alerts.deleteSuccess"));
      carregarMotos(motorcyclePagination?.page ?? 1);
    } catch (error) {
      Alert.alert(t("listaMotos.alerts.loadError"));
      console.error(error);
    }
  };

  const confirmarDeletarMoto = (id: number) =>
    Alert.alert(
      t("listaMotos.alerts.deleteConfirm"),
      "",
      [
        { text: t("listaMotos.buttons.previous"), style: "cancel" },
        {
          text: t("listaMotos.delete"),
          style: "destructive",
          onPress: () => deletarMoto(id)
        }
      ]
    );

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
        engineType: motoCompleta.engineType?.toString() || ""
      });
    } catch (error) {
      Alert.alert(t("listaMotos.modal.errors.failedEdit"));
      setModalVisible(false);
      console.error(error);
    } finally {
      setLoadingModal(false);
    }
  };

  const salvarEdicao = async () => {
    if (!editFormData.model || !editFormData.plate) {
      Alert.alert(t("listaMotos.modal.errors.modelPlateRequired"));
      return;
    }
    if (!editandoMoto) return;

    const lastRevisionDate = editFormData.lastRevisionDate
      ? new Date(editFormData.lastRevisionDate).toISOString()
      : new Date().toISOString();

    try {
      setLoadingModal(true);
      await updateMotorcycle(editandoMoto.id, {
        ...editandoMoto,
        ...editFormData,
        lastRevisionDate
      });
      Alert.alert(t("listaMotos.modal.saveButton"));
      setModalVisible(false);
      carregarMotos(motorcyclePagination?.page ?? 1);
    } catch (error) {
      Alert.alert(t("listaMotos.modal.errors.failedEdit"));
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
      engineType: 0
    });
  };

  const carregarMotos = async (page = 1) => {
    try {
      setLoading(true);
      const resposta = await findMotorcycles(page, 5);
      setMotorcyclePagination(resposta);
    } catch (err) {
      Alert.alert(t("listaMotos.alerts.loadError"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarMotos(1);
    }, [])
  );

  const MotoItem = ({ moto }: { moto: Motorcycle }) => (
    <View style={styles.item}>
      <Text style={styles.text}>
        🏍️ {t("telaMottu.labels.model")}: {moto.model}
      </Text>
      <Text style={styles.text}>📄 {t("telaMottu.labels.plate")}: {moto.plate}</Text>
      <Text style={styles.text}>📍 Spot ID: {moto.spotId}</Text>
      <Text style={styles.text}>🗓 {t("paginaInicial.loading")}: {moto.lastRevisionDate}</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10
        }}
      >
        <TouchableOpacity
          style={[styles.smallButton, { backgroundColor: "#1E90FF" }]}
          onPress={() => abrirModalEdicao(moto)}
        >
          <Text style={styles.smallButtonText}>
            {t("listaMotos.edit")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.smallButton, { backgroundColor: "#B22222" }]}
          onPress={() => confirmarDeletarMoto(moto.id)}
        >
          <Text style={styles.smallButtonText}>
            {t("listaMotos.delete")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const paginaAtual = motorcyclePagination?.page ?? 1;
  const totalPaginas = motorcyclePagination?.totalPages ?? 1;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.title}>{t("listaMotos.title")}</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.input} />
      ) : !motorcyclePagination || motorcyclePagination.items.length === 0 ? (
        <Text style={styles.info}>{t("listaMotos.noData")}</Text>
      ) : (
        <>
          <View style={styles.listContainer}>
            <FlatList
              data={motorcyclePagination.items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MotoItem moto={item} />}
              showsVerticalScrollIndicator={true}
            />
          </View>

          <View style={styles.paginationSection}>
            <Text style={styles.paginationInfo}>
              {t("listaMotos.pagination", {
                pagina: paginaAtual,
                totalPaginas: totalPaginas
              })}
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: motorcyclePagination.hasPrevious
                      ? "#1E90FF"
                      : "#666",
                    flex: 1,
                    marginRight: 5
                  }
                ]}
                disabled={!motorcyclePagination.hasPrevious}
                onPress={() => {
                  if (motorcyclePagination.hasPrevious)
                    carregarMotos(paginaAtual - 1);
                }}
              >
                <Text style={styles.actionButtonText}>
                  {t("listaMotos.buttons.previous")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: motorcyclePagination.hasNext
                      ? "#32CD32"
                      : "#666",
                    flex: 1,
                    marginLeft: 5
                  }
                ]}
                disabled={!motorcyclePagination.hasNext}
                onPress={() => {
                  if (motorcyclePagination.hasNext)
                    carregarMotos(paginaAtual + 1);
                }}
              >
                <Text style={styles.actionButtonText}>
                  {t("listaMotos.buttons.next")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
    color: "#7CFC00"
  },
  listContainer: {
    flex: 1,
    maxHeight: 600,
    marginBottom: 20
  },
  item: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#7CFC00"
  },
  text: { fontSize: 16, color: "#FFF", marginBottom: 4 },
  info: { textAlign: "center", color: "#888", fontSize: 16 },
  smallButton: {
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center"
  },
  smallButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  paginationSection: {
    alignItems: "center",
    marginTop: 10
  },
  paginationInfo: { color: "#7CFC00", fontSize: 16, marginBottom: 10 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%"
  },
  actionButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center"
  },
  actionButtonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 }
});
