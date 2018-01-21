import reducer, { updateToolState} from '../../../app/tools';
import { initialTools } from '../../../app/tools/reducer';

describe('tools reducer', () => {

	describe('with initial state', () => {

		it('should handle initial state', () => {
      expect(reducer(initialTools, { type: 'unknown' })).toBe(initialTools);
    });

    it('should handle updateToolState', () => {
			const newState:number = 2;
			const updatedTool = initialTools[0];
			updatedTool.state = 2;
      expect(reducer(initialTools, updateToolState(initialTools[0], newState))[0]).toEqual(updatedTool);
    });

    it('should handle unknown action type', () => {
      expect(reducer([], { type: 'unknown' })).toEqual([]);
    });
});
});
