/* eslint-disable no-undef */
const nodoDatosTabla = document.querySelector(".datos-tabla");
const url = "http://localhost:3001/facturas";
let datosAPI;

const facturas = async () => {
  datosAPI = await fetch(url);
  const datosApiJson = await datosAPI.json();
  const datosParaTabla = prepararDatosTabla(datosApiJson);
  rellenarTablaConDatosPreparados(datosParaTabla);
};

const prepararDatosTabla = (datosApi) => {
  const datosApiInsertarTabla = datosApi
    .filter(objetoDato => objetoDato.tipo === "ingreso")
    .map(objetoDatoFiltrado => ({
      numero: objetoDatoFiltrado.numero,
      fecha: luxon.DateTime.fromMillis(parseInt(objetoDatoFiltrado.fecha, 10)).toLocaleString(),
      concepto: objetoDatoFiltrado.concepto,
      base: objetoDatoFiltrado.base,
      iva: `${(objetoDatoFiltrado.base * 21) / 100}€ (${objetoDatoFiltrado.tipoIva}%)`,
      // Acabar de rellenar datos que faltan por orden en que aparecen en la tabla

    }));
  return datosApiInsertarTabla;
};

const rellenarTablaConDatosPreparados = (arrayDatosInsertarTablaPreparados) => {
  const nodoMolde = document.createElement("tr");
  arrayDatosInsertarTablaPreparados.forEach(objetoInserirTabla => {
    const nodoFilaInserirTabla = nodoMolde.cloneNode();
    // eslint-disable-next-line guard-for-in
    for (const keyDatoInserirTd in objetoInserirTabla) {
      const dataInserirTd = document.createElement("td");
      dataInserirTd.textContent = objetoInserirTabla[keyDatoInserirTd];
      nodoFilaInserirTabla.appendChild(dataInserirTd);
    }
    nodoDatosTabla.append(nodoFilaInserirTabla);
  });
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
