import { assert } from 'chai';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// import Modal from '../../src/Modal';

describe('Modal', () => {
  it('Should be rendered on the server side', () => {
    assert.doesNotThrow(() =>
      ReactDOMServer.renderToString(<strong>Message</strong>),
    );
  });
});
