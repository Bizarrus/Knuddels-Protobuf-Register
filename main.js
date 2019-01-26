global.Workspace	= require('path').dirname(__filename);
const Config		= require('./package.json');
const Encoder		= require('./classes/Encoder.js');
const Decoder		= require('./classes/Decoder.js');
const inquirer		= require('inquirer');
const yargs			= require('yargs');

if(require.main !== module) {
	module.exports.Encoder = Encoder;
	module.exports.Decoder = Decoder;
	return;
}

if(Object.keys(yargs.argv).length > 2) {
	yargs
	
	// Version
	.alias('v', 'version')
	.describe('v', 'show version information')
	.version(Config.version)

	// Help
	.alias('h', 'help')
	.help('help')
	.usage('Usage: ' + Config.name + ' <parameters>')
	.showHelpOnFail(true, 'Specify --help for available options')
	
	// Type
	.alias('t', 'type')
	.describe('t', 'specific the request type (CHECK, REGISTER) <required>')
	
	// Nickname
	.alias('n', 'nick')
	.describe('n', 'specific the nickname')
	
	// Password
	.alias('p', 'pass')
	.describe('p', 'specific the password')
	
	// Age
	.alias('a', 'age')
	.describe('a', 'specific the age')
	
	// Gender
	.alias('g', 'gender')
	.describe('g', 'specific the gender (male, MALE, 1, m or female, FEMALE, 2, f)')
	
	// Gender
	.alias('c', 'cat')
	.describe('c', 'specific the category (Default: 7)')
	
	if(Object.keys(yargs.argv).length == 2) {
		yargs.showHelp();
	}
	
	if(typeof(yargs.argv.type) === 'undefined' || yargs.argv.type.length <= 0) {
		yargs.showHelp();
		return;
	}
	
	switch(yargs.argv.type.toUpperCase()) {
		case 'CHECK':
			if(typeof(yargs.argv.nick) === 'undefined' || yargs.argv.nick.length <= 0) {
				console.log('[Error] --nick is empty!');
				return;
			}
			
			Encoder.check(yargs.argv.nick, function onSuccess(error, buffer) {
				if(error) {
					throw new Error(error);
				}
				
				console.log(buffer);
			});
		break;
		case 'REGISTER':
			if(typeof(yargs.argv.nick) === 'undefined' || yargs.argv.nick.length <= 0) {
				console.log('[Error] --nick is empty!');
				return;
			}
			
			if(typeof(yargs.argv.pass) === 'undefined' || yargs.argv.pass.length <= 0) {
				console.log('[Error] --pass is empty!');
				return;
			}
			
			if(typeof(yargs.argv.age) === 'undefined' || yargs.argv.age.length <= 0) {
				console.log('[Error] --age is empty!');
				return;
			}
			
			if(!(yargs.argv.age + '').match(/^-{0,1}\d+$/)) {
				console.log('[Error] --age with the value "' + yargs.argv.age + '" is not a valid number!');
				return;
			}
			
			if(typeof(yargs.argv.gender) === 'undefined' || yargs.argv.gender.length <= 0) {
				console.log('[Error] --gender is empty!');
				return;
			}
			
			if(Encoder.getEnum({
				UNSPECIFIED:	0,
				MALE:			1,
				FEMALE:			2
			}, yargs.argv.gender) === null) {
				console.log('[Error] --gender has a bad value (' + yargs.argv.gender + ')!');
				return;
			}
			
			if(typeof(yargs.argv.cat) === 'undefined' || yargs.argv.cat.length <= 0) {
				yargs.argv.cat = 7;
			} else {
				if(!(yargs.argv.cat + '').match(/^-{0,1}\d+$/)) {
					console.log('[Error] --cat with the value "' + yargs.argv.cat + '" is not a valid number!');
					return;
				}
			}
			
			Encoder.submit(yargs.argv.nick, yargs.argv.pass, yargs.argv.gender, parseInt(yargs.argv.age, 10), parseInt(yargs.argv.cat, 10), function onSuccess(error, buffer) {
				if(error) {
					throw new Error(error);
				}
				
				console.log(buffer);
			});
		break;
		default:
			console.log('[Error] Unknown --type with value "' + yargs.argv.type.toUpperCase() + '". Specify --help for available options');
			return;
		break;
	}
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
					if((value + '').match(/^-{0,1}\d+$/)) {
						return true;
					}
					
					if(!isNaN(value)) {
						return 'Please enter a valid number!';
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
					if((value + '').match(/^-{0,1}\d+$/)) {
						return true;
					}
					
					if(!isNaN(value)) {
						return 'Please enter a valid number!';
					}

					return 'Please enter a valid number!';
				}
			}]).then(data => {
				Encoder. submit(data.nickname, data.password, data.gender, parseInt(data.age, 10), parseInt(data.category, 10), function onSuccess(error, buffer) {
					if(error) {
						throw new Error(error);
					}
					
					console.log(buffer);
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
					if(error) {
						throw new Error(error);
					}
					
					console.log(buffer);
				});
			});
		break;
		case 'version':
			console.log('v' + Config.version);
		break;
	}
});