import {
  type CompletionContext,
  type CompletionResult,
  type Completion,
  snippetCompletion,
} from '@codemirror/autocomplete';

const CSS_PROPERTIES: Array<{ label: string; detail?: string; apply?: string }> = [
  // Layout & Modern Centering
  { label: 'display', detail: 'CSS Property', apply: 'display: ' },
  { label: 'place-items', detail: 'CSS Grid/Flex', apply: 'place-items: ' },
  { label: 'place-content', detail: 'CSS Grid/Flex', apply: 'place-content: ' },
  { label: 'justify-content', detail: 'Flex/Grid Alignment', apply: 'justify-content: ' },
  { label: 'justify-items', detail: 'Grid Alignment', apply: 'justify-items: ' },
  { label: 'align-items', detail: 'Flex/Grid Alignment', apply: 'align-items: ' },
  { label: 'align-content', detail: 'Flex/Grid Alignment', apply: 'align-content: ' },
  { label: 'align-self', detail: 'Item Alignment', apply: 'align-self: ' },
  { label: 'flex-direction', detail: 'Flex Layout', apply: 'flex-direction: ' },
  { label: 'flex-wrap', detail: 'Flex Layout', apply: 'flex-wrap: ' },
  { label: 'gap', detail: 'Spacing', apply: 'gap: ' },
  { label: 'row-gap', detail: 'Spacing', apply: 'row-gap: ' },
  { label: 'column-gap', detail: 'Spacing', apply: 'column-gap: ' },
  { label: 'grid-template-columns', detail: 'Grid Layout', apply: 'grid-template-columns: ' },
  { label: 'grid-template-rows', detail: 'Grid Layout', apply: 'grid-template-rows: ' },

  // Text & Overflow (Level 2)
  { label: 'overflow', detail: 'Overflow Behavior', apply: 'overflow: ' },
  { label: 'overflow-x', detail: 'Horizontal Overflow', apply: 'overflow-x: ' },
  { label: 'overflow-y', detail: 'Vertical Overflow', apply: 'overflow-y: ' },
  { label: 'text-overflow', detail: 'Text Truncation', apply: 'text-overflow: ' },
  { label: 'white-space', detail: 'Whitespace Wrapping', apply: 'white-space: ' },

  // Positioning & Box Model
  { label: 'position', detail: 'Positioning', apply: 'position: ' },
  { label: 'top', detail: 'Offset', apply: 'top: ' },
  { label: 'bottom', detail: 'Offset', apply: 'bottom: ' },
  { label: 'left', detail: 'Offset', apply: 'left: ' },
  { label: 'right', detail: 'Offset', apply: 'right: ' },
  { label: 'margin', detail: 'Box Model', apply: 'margin: ' },
  { label: 'margin-top', detail: 'Box Model', apply: 'margin-top: ' },
  { label: 'margin-bottom', detail: 'Box Model', apply: 'margin-bottom: ' },
  { label: 'margin-left', detail: 'Box Model', apply: 'margin-left: ' },
  { label: 'margin-right', detail: 'Box Model', apply: 'margin-right: ' },
  { label: 'padding', detail: 'Box Model', apply: 'padding: ' },
  { label: 'width', detail: 'Sizing', apply: 'width: ' },
  { label: 'max-width', detail: 'Sizing', apply: 'max-width: ' },
  { label: 'min-width', detail: 'Sizing', apply: 'min-width: ' },
  { label: 'height', detail: 'Sizing', apply: 'height: ' },
  { label: 'max-height', detail: 'Sizing', apply: 'max-height: ' },
  { label: 'z-index', detail: 'Stacking', apply: 'z-index: ' },
  { label: 'box-sizing', detail: 'Box Sizing', apply: 'box-sizing: ' },
  { label: 'transform', detail: 'Transform', apply: 'transform: ' },
];

const CSS_PROPERTY_VALUES: Record<string, Array<{ label: string; detail?: string }>> = {
  display: [
    { label: 'grid;', detail: 'Modern Grid' },
    { label: 'flex;', detail: 'Modern Flexbox' },
    { label: 'inline-flex;', detail: 'Inline Flexbox' },
    { label: 'inline-grid;', detail: 'Inline Grid' },
    { label: 'block;', detail: 'Block Element' },
    { label: 'inline-block;', detail: 'Inline Block' },
    { label: 'none;', detail: 'Hide Element' },
  ],
  'place-items': [
    { label: 'center;', detail: 'Center Both Axes' },
    { label: 'start;', detail: 'Align to Start' },
    { label: 'end;', detail: 'Align to End' },
    { label: 'stretch;', detail: 'Stretch to Fill' },
  ],
  'place-content': [
    { label: 'center;', detail: 'Center Content' },
    { label: 'space-between;', detail: 'Distribute Evenly' },
    { label: 'space-around;', detail: 'Even Spacing' },
  ],
  'justify-content': [
    { label: 'center;', detail: 'Center Horizontally' },
    { label: 'space-between;', detail: 'Space Between Items' },
    { label: 'space-around;', detail: 'Space Around Items' },
    { label: 'space-evenly;', detail: 'Equal Spacing' },
    { label: 'flex-start;', detail: 'Start of Axis' },
    { label: 'flex-end;', detail: 'End of Axis' },
  ],
  'justify-items': [
    { label: 'center;', detail: 'Center in Grid' },
    { label: 'start;', detail: 'Start in Grid' },
    { label: 'end;', detail: 'End in Grid' },
    { label: 'stretch;', detail: 'Stretch in Grid' },
  ],
  'align-items': [
    { label: 'center;', detail: 'Center Vertically' },
    { label: 'flex-start;', detail: 'Start of Cross-Axis' },
    { label: 'flex-end;', detail: 'End of Cross-Axis' },
    { label: 'stretch;', detail: 'Stretch Height' },
    { label: 'baseline;', detail: 'Align Baseline' },
  ],
  'align-content': [
    { label: 'center;', detail: 'Center Rows' },
    { label: 'space-between;', detail: 'Distribute Rows' },
    { label: 'flex-start;', detail: 'Pack Rows at Start' },
  ],
  'align-self': [
    { label: 'center;', detail: 'Center Self' },
    { label: 'auto;', detail: 'Inherit' },
    { label: 'flex-start;', detail: 'Align at Start' },
    { label: 'flex-end;', detail: 'Align at End' },
  ],
  'flex-direction': [
    { label: 'row;', detail: 'Horizontal' },
    { label: 'column;', detail: 'Vertical' },
    { label: 'row-reverse;', detail: 'Reversed Row' },
    { label: 'column-reverse;', detail: 'Reversed Column' },
  ],
  'flex-wrap': [
    { label: 'wrap;', detail: 'Wrap to Next Line' },
    { label: 'nowrap;', detail: 'Single Line' },
    { label: 'wrap-reverse;', detail: 'Reverse Wrap' },
  ],
  gap: [
    { label: '16px;', detail: 'Standard Gap' },
    { label: '8px;', detail: 'Compact Gap' },
    { label: '12px;', detail: 'Medium Gap' },
    { label: '24px;', detail: 'Spacious Gap' },
    { label: '1rem;', detail: 'Relative Gap' },
  ],
  overflow: [
    { label: 'hidden;', detail: 'Clip Overflow' },
    { label: 'auto;', detail: 'Scroll When Needed' },
    { label: 'scroll;', detail: 'Always Show Scrollbar' },
    { label: 'visible;', detail: 'Default Overflow' },
  ],
  'overflow-x': [
    { label: 'hidden;', detail: 'Clip Horizontal' },
    { label: 'auto;', detail: 'Scroll Horizontal' },
  ],
  'overflow-y': [
    { label: 'hidden;', detail: 'Clip Vertical' },
    { label: 'auto;', detail: 'Scroll Vertical' },
  ],
  'text-overflow': [
    { label: 'ellipsis;', detail: 'Truncate with Three Dots (...)' },
    { label: 'clip;', detail: 'Truncate with Sharp Cut' },
  ],
  'white-space': [
    { label: 'nowrap;', detail: 'Never Wrap (Single Line)' },
    { label: 'normal;', detail: 'Standard Text Wrapping' },
    { label: 'pre-wrap;', detail: 'Preserve Newlines & Wrap' },
  ],
  position: [
    { label: 'sticky;', detail: 'Stick on Scroll' },
    { label: 'relative;', detail: 'Relative Context' },
    { label: 'absolute;', detail: 'Absolute Offset' },
    { label: 'fixed;', detail: 'Viewport Fixed' },
  ],
  margin: [
    { label: 'auto;', detail: 'Center Alignment' },
    { label: '0 auto;', detail: 'Center Horizontally' },
    { label: '0;', detail: 'Reset Margin' },
  ],
  'box-sizing': [
    { label: 'border-box;', detail: 'Include Padding/Border' },
    { label: 'content-box;', detail: 'W3C Default' },
  ],
  'grid-template-columns': [
    { label: 'repeat(3, 1fr);', detail: '3 Equal Columns' },
    { label: 'repeat(4, 1fr);', detail: '4 Equal Columns' },
    { label: 'repeat(2, 1fr);', detail: '2 Equal Columns' },
    { label: '1fr 1fr;', detail: 'Two Columns' },
  ],
};

const CSS_SNIPPETS = [
  snippetCompletion('display: grid;\nplace-items: center;', {
    label: 'display: grid; place-items: center;',
    type: 'snippet',
    detail: '⭐ Modern Center (2 lines)',
  }),
  snippetCompletion('display: flex;\njustify-content: center;\nalign-items: center;', {
    label: 'display: flex; justify-content: center; align-items: center;',
    type: 'snippet',
    detail: '⭐ Flexbox Center (3 lines)',
  }),
  snippetCompletion('overflow: hidden;\ntext-overflow: ellipsis;\nwhite-space: nowrap;', {
    label: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
    type: 'snippet',
    detail: '⭐ Text Truncation with Ellipsis',
  }),
];

export function cssCustomCompletionSource(context: CompletionContext): CompletionResult | null {
  const line = context.state.doc.lineAt(context.pos);
  const textBefore = line.text.slice(0, context.pos - line.from);

  // Check if we are typing after a colon ':' (i.e. completing a property VALUE)
  const lastColonIndex = textBefore.lastIndexOf(':');
  const lastSemicolonIndex = textBefore.lastIndexOf(';');

  const isAfterColon = lastColonIndex !== -1 && lastColonIndex > lastSemicolonIndex;

  if (isAfterColon) {
    // Extract property name before the colon
    const beforeColon = textBefore.slice(0, lastColonIndex).trim();
    const propName = beforeColon.split(/[\s;{}]+/).pop()?.toLowerCase() || '';

    const wordAfterColon = context.matchBefore(/[\w-]*/);
    const startPos = wordAfterColon ? wordAfterColon.from : context.pos;

    const values = CSS_PROPERTY_VALUES[propName];
    if (values) {
      const options: Completion[] = values.map((val) => ({
        label: val.label,
        type: 'keyword',
        detail: val.detail,
        boost: 2,
      }));

      return {
        from: startPos,
        options,
        validFor: /^[\w-]*;?$/,
      };
    }
  }

  // Otherwise, we are completing a PROPERTY NAME or a SNIPPET (NEVER HTML tags like <div>!)
  const word = context.matchBefore(/[\w-]*/);
  if (!word && !context.explicit) return null;

  const startPos = word ? word.from : context.pos;

  const propertyOptions: Completion[] = CSS_PROPERTIES.map((prop) => ({
    label: prop.label,
    type: 'property',
    detail: prop.detail,
    apply: prop.apply || `${prop.label}: `,
    boost: 3,
  }));

  return {
    from: startPos,
    options: [...propertyOptions, ...CSS_SNIPPETS],
    validFor: /^[\w-]*$/,
  };
}

import { autocompletion, acceptCompletion } from '@codemirror/autocomplete';
import { indentWithTab } from '@codemirror/commands';
import { keymap } from '@uiw/react-codemirror';

export const cssEditorExtensions = [
  autocompletion({
    override: [cssCustomCompletionSource],
    defaultKeymap: true,
  }),
  keymap.of([
    {
      key: 'Tab',
      run: acceptCompletion,
    },
    indentWithTab,
  ]),
];
