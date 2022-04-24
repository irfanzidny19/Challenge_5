import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock';
import * as redux from 'react-redux';
import * as ReactNative from 'react-native';

jest.useFakeTimers();

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
const useSelectorSpy = jest.spyOn(redux, 'useSelector');
const mockDispatchFn = jest.fn();
useDispatchSpy.mockReturnValue(mockDispatchFn);
useSelectorSpy.mockReturnValue(mockDispatchFn);