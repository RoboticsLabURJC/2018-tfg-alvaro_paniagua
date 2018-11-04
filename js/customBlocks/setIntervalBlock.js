var setIntervalBlock = {
  "type": "set_interval",
  "message0": "Execute every %1 miliseconds %2",
  "args0": [
    {
      "type": "field_number",
      "name": "TIME",
      "value": 0,
      "min": 0
    },
    {
      "type": "input_statement",
      "name": "TEXT"
    }
  ],
  "output": null,
  "colour": "%{BKY_LOOPS_HUE}",
  "tooltip": "Execute code inside every given miliseconds",
  "helpUrl": ""
};

Blockly.Blocks['set_interval'] = {
  init: function() {
    this.jsonInit(setIntervalBlock);
  }
};

Blockly.JavaScript['set_interval'] = function(block) {
  var number_name = block.getFieldValue('TIME');
  var statements_text = Blockly.JavaScript.statementToCode(block, 'TEXT');

  var code = 'setInterval(()=>{\n' + statements_text + '},' + number_name + ');\n';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Python['set_interval'] = function(block) {
  var number_name = block.getFieldValue('TIME');
  var statements_text = Blockly.Python.statementToCode(block, 'TEXT');

  var code = 'while True:\n' + statements_text + '\ntime.sleep(' + number_name + ')\n';
  return [code, Blockly.Python.ORDER_ATOMIC];
};
