/**
 *
 * @authors Zhang Genmao (zgm4454@gmail.com)
 * @date    2016-07-04 14:40:28
 * @version 0.1
 */

'use strict';

var imgDatas = ['./dep/img/1.png', './dep/img/2.png', './dep/img/3.png'];

var CarouseBox = React.createClass({
	render: function () {
		return (
			<div className = "container promo">
				<div className="row">
					<CarouseItem />
				</div>
			</div>
		);
	}
});

var CarouseItem = React.createClass({
	getInitialState: function () {
		return {
			pageNum: 0
		};
	},
	handleClickPrev: function () {
		var _self = this.refs.promobg.getDOMNode();

		this.setState(function (state) {
			state.pageNum = (state.pageNum === 0) ? 2 : state.pageNum - 1;
			return { pageNum: state.pageNum };
		});

		if (this.state.pageNum === 0) {
			_self.style.cssText = "transform: translate3d(-2340px, 0, 0); transition: 500ms ease;";
		}
		else if (this.state.pageNum === 1) {
			_self.style.cssText = "transform: translate3d(0, 0, 0); transition: 500ms ease;";
		}
		else if (this.state.pageNum === 2) {
			_self.style.cssText = "transform: translate3d(-1170px, 0, 0); transition: 500ms ease;";
		}
	},
	handleClickNext: function () {
		var _self = this.refs.promobg.getDOMNode();

		this.setState(function (state) {
			state.pageNum = (state.pageNum === 2) ? 0 : state.pageNum + 1;
			return { pageNum: state.pageNum };
		});

		if (this.state.pageNum === 0) {
			_self.style.cssText = "transform: translate3d(-1170px, 0, 0); transition: 500ms ease;";
		}
		else if (this.state.pageNum === 1) {
			_self.style.cssText = "transform: translate3d(-2340px, 0, 0); transition: 500ms ease;";
		}
		else if (this.state.pageNum === 2) {
			_self.style.cssText = "transform: translate3d(0, 0, 0); transition: 500ms ease;";
		}
	},
	render: function () {
		var children = [];
		var pos = 0;
		var style = { transform: 'translate3d(0, 0, 0)' }
		for (var i = 0; i < imgDatas.length; i++) {
			var _style = {
				left: pos * 1170
			}
			pos++;
			children.push(
				<div className = "container-item" style={_style}>
					<img src={imgDatas[i]} alt='美女' />
				</div>);
		}
		return (
			<div className="col-lg-12 col-md-12 col-sm-12">
				<div className="carouse-box" ref="promobg" style={style} key='img'>
					{children}
				</div>
				<div className="promo-ft">
					<div className="promo-opt col-lg-12 col-md-12 col-sm-12" >
						<a href="javascript:void(0);" className="prev" onClick={this.handleClickPrev}>
							<span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
						</a>
						<a href="javascript:void(0);" className="next" onClick={this.handleClickNext}>
							<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
						</a>
					</div>
				</div>

			</div>
		);
	}
});



ReactDOM.render(< CarouseBox / >,
	document.getElementById('app')
);