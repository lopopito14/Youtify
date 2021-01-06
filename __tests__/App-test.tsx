/**
 * @format
 */

import 'react-native';
import React from 'react';
import Main from '../app/views/main';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Main />);
});
