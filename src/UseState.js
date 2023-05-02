import React from "react";
import CustomInput from "./components/CustomInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const notify = () =>
    toast.error("Fallaste capo", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
    notify();
  };

  const onWhrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      error: false,
      loading: true,
    });
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  };

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if (!!state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validación");

        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }
        console.log("Termionando la validación");
      }, 3000);
    }

    console.log("Terminando el efecto");
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2 style={{ marginTop: 0 }}>Eliminar {name}</h2>

        <p>Por favor, escribe el código de seguridad.</p>

        {/* {!!state.error && <p>Error: El código ingresado es incorrecto.</p>} */}
        {/* {!!state.loading && <p>Cargando...</p>} */}
        <CustomInput
          onClick={() => {
            onCheck();
          }}
          onChange={(event) => {
            onWhrite(event.target.value);
          }}
          value={state.value}
          isLoading={state.loading}
        />
        <ToastContainer />
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <h2>Eliminar UseState</h2>
        <p>¿Estas seguro que quieres eliminar?</p>

        <Button
          onClick={() => {
            onDelete();
          }}
          variant="contained"
          sx={{mr: "5px"}}
        >
          Sí, Eliminar
        </Button>
        <Button
          onClick={() => {
            onReset();
          }}
          variant="contained"
        >
          No, me arrepentí
        </Button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito</p>

        <Button
          onClick={() => {
            onReset();
          }}
          variant="contained"
        >
          resetear, volver atrás
        </Button>
      </React.Fragment>
    );
  }
}

export { UseState };
