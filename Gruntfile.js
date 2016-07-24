// 包装函数
module.exports = function(grunt) {

	// 任务配置,所有插件的配置信息
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//编译sass文件
		sass: {
			dist : {
				options: {
					style: 'expanded'
				},
				files: {
					'./src/css/style.css' : './src/css/style.scss'
				}
			}
		},


		//压缩CSS文件
		cssmin: {
			target: {
				files: [{
					expand: true,	//启用下列参数
					cwd: './src/css',	//指定带压缩文件路径
					src: ['*.css', '!*.min.css'],	//匹配相对于cwd目录下的非 .min.css的所以.css文件
					dest: './dep/css',	//生成的压缩文件存放地址
					ext: '.min.css'	//生成的文件都使用.min.css替换原有扩展名，生成文件存放于dest指定的目录中
				}]
			}
		},


		//监控文件变化并自动运行grunt的watch插件
		//watch插件的配置信息
		watch: {
			scripts: {
				files: ['./src/js/app.js'],
				options: {livereload:true},
				tasks: ['jshint', 'uglify']
			},
			sass: {
				files: ['./src/css/style.scss'],
				tasks: ['sass'],
				options: {livereload:true}
			},
			html: {
				files: ['./*.html'],
				options: {livereload:true}
			}
		},
		//搭建本地服务器 端口号8000
		connect: {
			options: {
				port: 9000,
				open: true,
				livereload: 35729,
				// Change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			server: {
				options: {
					port: 9001,
					base: './'
				}
			}
		}
	});

	// 告诉grunt我们将使用插件
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 告诉grunt当我们在终端中输入grunt时需要做些什么
	grunt.registerTask('outputcss', ['sass', 'cssmin']); //编译sass 压缩css
	grunt.registerTask('server', ['sass', 'cssmin', 'connect','watch']);
	grunt.registerTask('default', ['sass', 'cssmin', 'connect','watch']);
};
