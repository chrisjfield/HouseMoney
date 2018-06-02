import { createTransform } from 'redux-persist';
import { IOccupantProps } from '../components/Occupants/occupantsInterfaces';

const occupantsPersistTransform = createTransform(
  
  // dont need to transform state on its way to being serialized and persisted.
  (inboundState: IOccupantProps, key) => {
      return { ...inboundState };
  },
  
  // transform state being rehydrated to avoid overwriting pass through auth
  (outboundState: IOccupantProps, key) => {
      return { ...outboundState, isLoggedIn: outboundState.isLoggedIn };
  },
  
  // define which reducers this transform gets called for.
  { whitelist: ['occupantsReducer'] },
);

export default occupantsPersistTransform;
