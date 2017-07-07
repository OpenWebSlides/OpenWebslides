import { IMPORT_UPLOAD_ERROR } from 'actions/fineUploaderActions';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  errors: [],
});

function fineUloaderReducer(state = initialState, action) {
  switch (action.type) {
    case IMPORT_UPLOAD_ERROR:
      return Immutable.merge(state, {
        errors: state.errors.concat([
          `file ${action.payload.name} caused an error: ${action.payload
            .error}`,
        ]),
      });
    default:
      return state;
  }
}
export default fineUloaderReducer;
