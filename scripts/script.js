const url = "http://localhost:3001/facturas";
let datosAPI;

const datosFacturas = async () => {
  datosAPI = await fetch(url);
  const datosApiJson = await datosAPI.json();
};

datosFacturas();
