const url = "http://localhost:3001/facturas";
let datosAPI;

const facturas = async () => {
  datosAPI = await fetch(url);
  const datosApiJson = await datosAPI.json();
};

facturas();
