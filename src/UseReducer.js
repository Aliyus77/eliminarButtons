import React from "react";
import CustomInput from "./components/CustomInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if (!!state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validación");

        if (state.value === SECURITY_CODE) {
          dispatch({ type: "CONFIRM" });
        } else {
          dispatch({ type: "ERROR" });
          notify();
        }
        console.log("Termionando la validación");
      }, 3000);
    }

    console.log("Terminando el efecto");
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>

        <p>Por favor, escribe el código de seguridad.</p>

        {/* {!!state.error && <p>Error: El código ingresado es incorrecto.</p>} */}
        {/* {!!state.loading && <p>Cargando...</p>} */}
        <CustomInput
          onClick={() => {
            dispatch({ type: "CHECK" });
            
          
          }}
          onChange={(event) => {
            dispatch({ type: "WRITE", payload: event.target.value });
            // onWrite(event,target.value);
          }}
          value={state.value}
          isLoading={state.loading}
        />
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <>
        <h2>Eliminar UseState</h2>
        <p>¿Estas seguro que quieres eliminar?</p>

        <Button
          onClick={() => {
            dispatch({ type: "DELETE" });
          }}
          variant="contained"
          sx={{mr: "5px"}}
        >
          Sí, Eliminar
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: "RESET" });
          }}
          variant="contained"
          sx={{mr: "5px"}}
        >
          No, me arrepentí
        </Button>
      </>
    );
  } else {
    return (
      <>
        <p>Eliminado con éxito</p>

        <Button
          onClick={() => {
            dispatch({ type: "RESET" });
          }}
          variant="contained"
          sx={{mr: "5px"}}
        >
          resetear, volver atrás
        </Button>
      </>
    );
  }
}

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};
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

const reducerObject = (state, payload) => ({
  
  CONFIRM: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  ERROR: {
    ...state,
    error: true,
    loading: false, 
  },
  
  CHECK: {
    ...state,
    error: false,
    loading: true,
  },
  DELETE: {
    ...state,
    deleted: true,
  },
  RESET: {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
  WRITE: {
    ...state,
    value: payload,
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };
