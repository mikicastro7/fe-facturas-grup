const url = "http://localhost:3001/facturas";
let datosAPI;

const facturas = async () => {
  datosAPI = await fetch(url);
  const datosApiJson = await datosAPI.json();
  obtenerMolde(datosApiJson);
};

const obtenerMolde = (datos) => {
  const nodoMolde = document.createElement("tr");
  const datosFiltrados = datos.filter(dato => dato.tipo === "ingreso");
  datosFiltrados.forEach(objeto => {
    anyadirDatoTabla(objeto.numero);
  });
};

const anyadirDatoTabla = (dato) => {
  const hijosNodoMolde = document.createElement("td");
  hijosNodoMolde.textContent = dato;
  console.log(hijosNodoMolde);
};

facturas();
