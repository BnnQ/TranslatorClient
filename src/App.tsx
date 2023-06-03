import { Provider } from 'inversify-react';
import {FC} from 'react';
import {container} from "./dependency-container";
import Translator from "./components/Translator";

const App : FC = () => {
  return (
      <Provider container={container}>
          <div className={"container-fluid mt-2"}>
              <div className={"text-center mb-5"}>
                  <h1 style={{fontSize: '40px'}}>Translator<span className={"text-primary"}>.ai</span></h1>
              </div>
              <Translator></Translator>
          </div>
      </Provider>
  );
};

export default App;
