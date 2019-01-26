global.Workspace	= require('path').dirname(__filename);
const Config		= require('./package.json');
const Encoder		= require('./classes/Encoder.js');
const Decoder		= require('./classes/Decoder.js');
const inquirer		= require('inquirer');

if(require.main !== module) {
	module.exports.Encoder = Encoder;
	module.exports.Decoder = Decoder;
	return;
}

inquirer.prompt([{
  type:		'rawlist',
  name:		'action',
  message:	'Which action do you wan\'t to run?',
  choices:	[
	'Register',
	'Check',
	new inquirer.Separator(),
	'Help',
	'Version'
  ]
}]).then(data => {
    switch(data.action.toLowerCase()) {
		case 'register':
			inquirer.prompt([{
				type:		'input',
				name:		'nickname',
				message:	'Nickname:',
				validate:	function validate(value) {
					if(value.length > 0) {
						return true;
					}
					
					return 'Please enter a nickname!';
				}
			}, {
				type:		'input',
				name:		'password',
				message:	'Password:',
				validate:	function validate(value) {
					if(value.length > 0) {
						return true;
					}
					
					return 'Please enter a password!';
				}
			}, {
				type:		'input',
				name:		'age',
				message:	'Age:',
				validate: function validate(value) {
					if(value.match(/[0-9]/i)) {
						return true;
					}

					return 'Please enter a valid age!';
				}
			}, {
				type:		'rawlist',
				name:		'gender',
				message:	'Gender:',
				choices:	[
					'Male',
					'Female'
				]
			}, {
				type:		'input',
				name:		'category',
				message:	'Category:',
				default: function() {
					return 7;
				},
				validate: function validate(value) {
					if((value + '').match(/[0-9]/i)) {
						return true;
					}

					return 'Please enter a valid number!';
				}
			}]).then(data => {
				Encoder. submit(data.nickname, data.password, data.gender, parseInt(data.age, 10), parseInt(data.category, 10), function onSuccess(error, buffer) {
					console.log(error, buffer);
				});
			});
		break;
		case 'check':
			inquirer.prompt([{
			  type:		'input',
			  name:		'nickname',
			  message:	'Nickname:',
			  validate: function validate(value) {
				  if(value.length > 0) {
						return true;
					}
					
					return 'Please enter a nickname!';
			  }
			}]).then(data => {
				Encoder.check(data.nickname, function onSuccess(error, buffer) {
					console.log(error, buffer);
				});
			});
		break;
		case 'help':
			console.log('Helping Topics,...');
		break;
		case 'version':
			console.log('v' + Config.version);
		break;
	}
});