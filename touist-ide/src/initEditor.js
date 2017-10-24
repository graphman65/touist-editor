import CodeMirror from 'codemirror';

import 'codemirror/addon/lint/lint';
import 'codemirror/addon/mode/simple';
import 'codemirror/addon/scroll/simplescrollbars';

import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

CodeMirror.registerHelper('lint', 'touist', (text, options, editor) => {
  const error = editor && editor.vueComponent && editor.vueComponent.openFile
    && editor.vueComponent.openFile.error;
  if (!error || !editor.getValue()) return [];

  return [{
    from: CodeMirror.Pos(error.start.line - 1, error.start.column),
    to: CodeMirror.Pos(error.end.line - 1, error.end.column),
    message: error.message,
    severity: 'warning',
  }];
});

CodeMirror.defineSimpleMode('touist', {
  start: [
    { regex: /"(?:[^\\"]|\\.)*"?/, token: 'string' },
    {
      regex: /(?:data|if|then|else|when)\b/,
      token: 'keyword',
    },
    {
      regex: /let|bigand|bigor|in|not|or|and|empty|subset|card|int|sqrt|mod|atleast|exact|atmost|inter|union|diff|forall|exists/,
      token: 'variable-2',
    },
    {
      regex: /:/,
      indent: true,
    },
    {
      regex: /end/,
      dedent: true,
      token: 'variable-2',
    },
    { regex: /[a-zA-Z_]\w*/, token: 'variable' },
    { regex: /true|false|Bot|Top/, token: 'atom' },
    {
      regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
      token: 'number',
    },
    { regex: /;;.*/, token: 'comment' },
    { regex: /[+,-/:<=>[]*]|\.\.|!=|==|=>|<=>|<=/, token: 'operator' },
  ],
  comment: [],
  meta: {
    dontIndentStates: ['comment'],
    lineComment: ';;',
  },
});
