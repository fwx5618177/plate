/** @jsx jsx */
import { Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { jsx } from '../../../../__test-utils__/jsx';
import { withNodeID } from '../../../plugins/node-id/withNodeID';
import { idCreatorFixture } from './fixtures';

const input = ((
  <editor>
    <hp id={10}>
      test
      <cursor />
    </hp>
  </editor>
) as any) as Editor;

const output = (
  <editor>
    <hp id={10}>test</hp>
    <hp id={11}>inserted</hp>
    <hp id={12}>inserted</hp>
  </editor>
) as any;

it('should keep the id', () => {
  const editor = withNodeID({ idCreator: idCreatorFixture })(
    withHistory(input)
  );

  Transforms.insertNodes(
    editor,
    (
      <fragment>
        <hp id={11}>inserted</hp>
        <hp id={12}>inserted</hp>
      </fragment>
    ) as any
  );

  editor.undo();
  editor.redo();
  editor.undo();
  editor.redo();

  expect(input.children).toEqual(output.children);
});
