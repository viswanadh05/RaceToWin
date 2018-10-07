// SIT708 Project: script.js - Viswanadh Bhaskarla - SID: 216319004

// Creating a function for responsive game design.
function ResponsiveGame()
{
	var availableWidth = $(window).width();
	var availableHeight = $(window).height();
	
	
	// if condition to check if available width is less than 976px and availableHeight is less than 1000px, if yes resize the window. 
	// Else keep the same settings.
	
	if(availableWidth < 976 && availableHeight < 1000) 
	{
		$("body").css( {"background-size": "1370px 733px" , "background-image": "url('images/background.jpg')"} );
		$("#Game_score").css( {"font-size": "18px", "margin-top": "20%" , "right": "2%"} );
		$("#title").css( {"width": "175px", "font-size": "12px" } );
		$("#moveleft").css( {"width": "60px" , "font-size": "16px" , "bottom": "20%" , "left": "80%"} );
		$("#moveright").css( {"width": "60px" , "font-size": "16px" , "bottom": "13%" , "left": "80%"} );
		$("#Game_box").css( {"width": "40%" , "left": "32%"});
		$(".obstacle").css( {"transform": "scale(0.5)"});
		$(".audi").css( {"transform": "scale(0.5)"});
		$("#Game_restart").css( {"font-size": "15px"});
		$("#restart").css( {"font-size": "15px"});
		$("#reset").css( {"right": "10%","font-size": "12px"});
		$("#pause").css( {"right": "10%","font-size": "12px"});
		$("#name_sid").css( {"font-size": "11px" });
	}
	
	// if condition to check if available height is less than 976 and availableHeight is greater than 100, if yes resize the window. 
	// Else keep the same settings.

	else if(availableHeight > 1000 && availableWidth < 976)
	{
		$("body").css( {"background-image": "url('images/BG.png')" , "background-size": "770px 1024px"});
		$("#Game_score").css( {"font-size": "18px", "margin-top": "20%" , "right": "6%"} );
		$("#title").css( {"width": "175px", "font-size": "18px" } );
		$("#moveleft").css( {"width": "60px" , "font-size": "16px" , "bottom": "20%" , "left": "80%"} );
		$("#moveright").css( {"width": "60px" , "font-size": "16px" , "bottom": "13%" , "left": "80%"} );
		$("#Game_box").css( {"width": "40%" , "left": "32%"});
		$(".obstacle").css( {"transform": "scale(0.7)"});
		$(".audi").css( {"transform": "scale(0.7)"});
		$("#Game_restart").css( {"font-size": "15px"});
		$("#restart").css( {"font-size": "15px"});
		$("#reset").css( {"right": "10%","font-size": "12px"});
		$("#pause").css( {"right": "10%","font-size": "12px"});
		$("#name_sid").css( {"font-size": "11px" });
		
	}

	else 
	{
		$("body").css( {"background-size": "1370px 733px" , "background-image": "url('images/background.jpg')"} );
		$("#Game_score").css( {"font-size": "35px", "margin-top": "10%" , "right": "17%"} );
		$("#title").css( {"width": "350px", "font-size": "45px" } );
		$("#moveleft").css( {"width": "60px" , "font-size": "16px" , "bottom": "10%" , "left": "70%"} );
		$("#moveright").css( {"width": "60px" , "font-size": "16px" , "bottom": "10%" , "left": "78%"} );
		$("#Game_box").css( {"width": "25%", "height": "100vh" , "left": "37%"} );
		$(".obstacle").css( {"transform": "scale(1)"});
		$(".audi").css( {"transform": "scale(1)"});
		$("#Game_restart").css( {"font-size": "40px"});
		$("#restart").css( {"font-size": "30px"});
		$("#reset").css( {"right": "2%","font-size": "24px"});
		$("#pause").css( {"right": "2%","font-size": "24px"});
		$("#name_sid").css( {"font-size": "14px" });

	}
}

// Creating a user input with prompt to ask a puzzle for playing the game. 

var answer = prompt("Solve the puzzle to play the game, what's the missing number in the series 0, 1, 1, 2, 3, 5, 8, 13, ? , 34");

if (answer == 21) 
{
		alert("Yay! Thats correct! Lets play the game");

		// The actual game logic and functions will start here.
		$(document).ready(function() 
		{
			$(window).resize(function() 
			{
				console.log("resized");
				ResponsiveGame();
			});

			// Creating variables for saving container objects.
			var container = $('#Game_box');
			var car = $('.audi');
			var line_1 = $('#line_1');
			var line_2 = $('#line_2');
			var line_3 = $('#line_3');
			var obstacle_1 = $('#car_red');
			var obstacle_2 = $('#viper');
			var obstacle_3 = $('#police');
			var restart_div = $('#Game_restart');
			var restart_btn = $('#restart');
			var pause = $('#pause');
			var score = $('#score');
			
			//Initializing setup by creating some variables.
			var container_left = parseInt(container.css('left'));
			var container_width = parseInt(container.width());
			var container_height = parseInt(container.height());
			var car_width = parseInt(car.width());
			var car_height = parseInt(car.height());

			var anim_frame;

			var game_over = false;

			var score_count = 1;

			//Declarations used for running the game.
			var spd = { speed: 2, line_speed: 5 };

			var keys = { move_right: false, move_left: false, move_up: false, move_down: false };
			
			anim_frame = requestAnimationFrame(Game_loop);

			/* Creating a function for running game loop continuously using requestAnimationFrame method. The loop is updated and called each time,
			such that score count, container lines, obstacles are looped. */
				
				
			function Game_loop() 
			{
				ResponsiveGame();

				if (func_collision(car, obstacle_1) || func_collision(car, obstacle_2) || func_collision(car, obstacle_3)) 
				{
					func_GameOver();
					return;
				}

				score_count++;
							
				// This of condition checks the user's score and updates the speed of moving objects.
				if (score_count % 20 == 0) 
				{
					score.text(parseInt(score.text()) + 1);
				}

				if (score_count % 500 == 0) 
				{
					spd.speed++;
					spd.line_speed++;
				}

				line_down(line_1);
				line_down(line_2);
				line_down(line_3);

				obstacle_down(obstacle_1);
				obstacle_down(obstacle_2);
				obstacle_down(obstacle_3);

				anim_frame = requestAnimationFrame(Game_loop);
					
			}

			// A function defined which makes the lines move in verticle direction by updating their position everytime.
				
			function line_down(line) 
			{
				var line_current_top = parseInt(line.css('top'));
					
				if (line_current_top > container_height) 
				{
					line_current_top = -300;
				}
					
				line.css('top', line_current_top + spd.line_speed);
			}

			// A function defined which makes the obstacles move in verticle direction by updating their position everytime.

			function obstacle_down(obstacle)
			{
				var obstacle_current_top = parseInt(obstacle.css('top'));
					
				if(obstacle_current_top > container_height) 
				{
					obstacle_current_top = -200;
						
					var obstacle_current_left = parseInt(Math.random() * (container_width + 5) - car_width);
						
					obstacle.css('left', obstacle_current_left);
				}

				obstacle.css('top', obstacle_current_top + spd.speed );
			}

			// Restart function calls when the user tap on restart when the game ends.
			restart_btn.onTap(function()
			{
				location.reload();
			});
			
			pause.onTap(function()
			{
				alert("The game is paused, click ok to resume.");
			});

			// A function defined which stops all the animationframes and pops up a restart button.
			function func_GameOver()
			{
				game_over = true;
				cancelAnimationFrame(anim_frame);
				cancelAnimationFrame(keys.move_right);
				cancelAnimationFrame(keys.move_left);
				cancelAnimationFrame(keys.move_up);
				cancelAnimationFrame(keys.move_down);
				restart_div.slideDown();
				restart_btn.focus();
			}
			
			// A function defined to reset the container when user had a collision with other obstacles.
			function func_collision($div1, $div2) 
			{
				var offsetl1 = $div1.offset().left;
				var offsett1 = $div1.offset().top;
				var oH1 = $div1.outerHeight(true);
				var oW1 = $div1.outerWidth(true);
				var x = offsett1 + oH1;
				var y = offsetl1 + oW1;
					
				var offsetl2 = $div2.offset().left;
				var offsett2 = $div2.offset().top;
				var oH2 = $div2.outerHeight(true);
				var oW2 = $div2.outerWidth(true);
				var x1 = offsett2 + oH2;
				var y1 = offsetl2 + oW2;

				if (x < offsett2 || offsett1 > x1 || y < offsetl2 || offsetl1 > y1) return false;
				return true;
			}

			// Move the user car towards left.
			$("#moveleft").click(function()
			{
				if (game_over === false && parseInt(car.css('left')) > 5)
				{
					car.css('left', parseInt(car.css('left')) - 15);
				}
			});

			// Move the user car towards right.
			$("#moveright").click(function()
			{
				if (game_over === false && parseInt(car.css('left')) < (container_width) - car_width)
				{
					car.css('left', parseInt(car.css('left')) + 15);
				}
			});
			
			
			// Two lines of script for game title animation.
			$("#title").weight(1.0);
			$("#title").autoBounceOff(true);
		});
}
	
else
{
	alert("Sorry! Its a wrong answer. Reset and try again")
}
	