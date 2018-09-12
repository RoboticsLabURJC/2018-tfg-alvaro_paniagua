var turnRightBlock = {
  "type": "turn_right",
  "message0": "Turn left %1 at speed %2",
  "args0": [
    {
      "type": "field_variable",
      "name": "NAME",
      "variable": "myRobot"
    },
    {
      "type": "input_value",
      "name": "ROBOTVAR",
      "check": "Number"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Sets speed for the robot.",
  "helpUrl": ""
}

Blockly.Blocks['turn_right'] = {
  init: function() {
    this.jsonInit(turnRightBlock);

  }
};

Blockly.JavaScript['turn_right'] = function(block) {
  var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_robotvar = Blockly.JavaScript.valueToCode(block, 'ROBOTVAR', Blockly.JavaScript.ORDER_ATOMIC);

  var code = variable_name + '.setW(-' + value_robotvar + '); \n';
  return code;
};
