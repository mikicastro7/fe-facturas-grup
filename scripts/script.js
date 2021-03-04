/* eslint-disable no-undef */
const url = "http://localhost:3001/facturas";
let datosAPI;

const facturas = async () => {
  datosAPI = await fetch(url);
  const datosApiJson = await datosAPI.json();
  const datosParaTabla = prepararDatosTabla(datosApiJson);
};

const prepararDatosTabla = (datosApi) => {
  const datosApiInsertarTabla = datosApi
    .filter(objetoDato => objetoDato.tipo === "ingreso")
    .map(objetoDatoFiltrado => ({
      numero: objetoDatoFiltrado.numero,
      fecha: luxon.DateTime.fromMillis(parseInt(objetoDatoFiltrado.fecha, 10)).toLocaleString(),
      concepto: objetoDatoFiltrado.concepto,
      base: objetoDatoFiltrado.base,
      iva: `${(objetoDatoFiltrado.base * 21) / 100}€(${objetoDatoFiltrado.tipoIva}%)`,
      // Acabar de rellenar datos que faltan por orden en que aparecen en la tabla

    }));
  return datosApiInsertarTabla;
};

/*
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
}; */

facturas();
