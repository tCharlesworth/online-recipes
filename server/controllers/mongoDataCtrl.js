var Recipe = require('../models/recipe');
var RecipeBook = require('../models/recipeBook');
var User = require('../models/user');
var Shareable = require('../models/shareable');

module.exports = {
	
	openRecipe: function(req, res) {
		User.findByIdAndUpdate(req.user._id, { $addToSet: {openRecipes: req.params.id}}, function(err, result) {
			if(err) {
				handleError(err, req, res);
			} else {
				res.json(result);
			}
		});
	},
	
	getOpenRecipes: function(req, res) {
		User.findOne({_id: req.user._id}).populate('openRecipes').exec(function(err, result) {
			if(err) {
				handleError(err, req, res);
			} else {
				res.json(result.openRecipes);
			}
		})
	},
	
	removeOpenRecipe: function(req, res) {
		User.findByIdAndUpdate(req.user._id, {$pull: {openRecipes: req.params.id}}, function(err, result) {
			if(err) {
				handleError(err, req, res);
			} else {
				res.json(result);
			}
		})
	},

	createRecipeBook: function (req, res) {
		var book = {
			bookName: req.body.name
		};
		RecipeBook.create(book, function (err, result) {
			if (err) {
				handleError(err, req, res);
			} else {
				//Add the book id to the correct user
				var id = req.user._id;
				var rid = result._id;
				User.findByIdAndUpdate(id, { $push: { recipeBooks: rid } }, function (err2, result2) {
					if (err2) {
						handleError(err2, req, res);
					} else {
						res.json(result);
					}
				})
			}
		});
	},

	deleteRecipe: function (req, res) {
		var info = req.body;
		RecipeBook.findByIdAndUpdate(info.bookId, { $pull: { recipes: info.recipeId } }, function (err, result) {
			if (err) {
				handleError(err, req, res);
			} else {
				RecipeBook.findOne({ _id: result._id }).populate('recipes').exec(function (err2, result2) {
					if (err2) {
						handleError(err2, req, res);
					} else {
						//Check if all sections have a recipe reference
						var sections = result2.sections;
						var recipes = result2.recipes;
						var changedSomething = false;
						var remainingSections = sections.filter(function (item) {
							for (var i = 0; i < recipes.length; i++) {
								if (recipes[i].recipeType === item)
									return true;
							}
							changedSomething = true;
							return false;
						})
						if (changedSomething) {
							// console.log("I Suggest changing", sections);
							// console.log("To", remainingSections);
							RecipeBook.findByIdAndUpdate(info.bookId, { $set: { sections: remainingSections } }, function (err3, result3) {
								if (err3) {
									handleError(err3, req, res);
								} else {
									res.json(result3);
								}
							})
						} else {
							res.json(result2);
						}
					}
				})
			}
		});
	},

	getRecipeBook: function (req, res) {
		var bookId = req.params.bookId;
		if (!bookId)
			res.status(400).send();
		RecipeBook.findOne({ _id: bookId }).populate('recipes').exec(function (err, result) {
			if (err) {
				handleError(err, req, res);
			} else {
				res.json(result);
			}
		});
	},

	getRecipe: function (req, res) {
		Recipe.findById(req.params.id, function (err, result) {
			if (err) {
				handleError(err, req, res);
			} else {
				res.json(result);
			}
		});
	},

	getRecipeBooks: function (req, res) {
		User.findById(req.user._id, function (err, result) {

			RecipeBook.find({ '_id': { $in: result.recipeBooks } }, function (err, result) {
				if (err) {
					handleError(err, req, res);
				} else {
					res.json(result);
				}
			})

		})
	},

	updateRecipe: function (req, res) {
		var changes = req.body;
		Recipe.findByIdAndUpdate(changes._id, changes, function (err, result) {
			if (err) {
				handleError(err, req, res);
			} else {

				var bookId = req.body.bookReference;
				RecipeBook.findOne({ _id: bookId }).populate('recipes').exec(function (err2, result2) {
					if (err2) {
						handleError(err2, req, res);
					} else {
						var changed = false;
						result2.sections = result2.sections.filter(function (item) {

							for (var i = 0; i < result2.recipes.length; i++) {
								if (result2.recipes[i].recipeType === item) {
									return true;
								}
							}
							changed = true;
							return false;
						})

						if (!changed) {
							// console.log("NO CHANGE SUGGESTED");
							res.json(result);
						} else {
							// console.log("NEW SECTIONS: ", result2.sections);
							RecipeBook.findByIdAndUpdate(bookId, result2, function (err3, result3) {
								if (err3) {
									handleError(err3, req, res);
								} else {
									res.json(result);
								}
							})
						}
					}
				});
			}
		});
	},

	addSection: function (req, res) {
		var info = req.body;
		RecipeBook.update({ _id: info.id }, { $addToSet: { sections: info.name } }, function (err, result) {
			if (err) {
				handleError(err, req, res);
			} else {
				res.json(result);
			}
		});
	},

	deleteRecipeBook: function (req, res) {
		var id = req.params.bookId;
		//first check number of contributors
		RecipeBook.findOne({ _id: id }, function (err, result) {
			if (err) {
				handleError(err, req, res);
			} else {
				if (result.contributors > 1) {
					//decrement contributors
					RecipeBook.update({ _id: id }, { $inc: { contributors: -1 } }, function (err2, result2) {
						if (err2) {
							handleError(err2, req, res);
						} else {
							//remove from current user
							User.update({ _id: req.user._id }, { $pull: { recipeBooks: id } }, function (err3, result3) {
								if (err3) {
									handleError(err3, req, res);
								} else {
									res.status(200).send();
								}
							})
						}
					})
					res.send();
				} else {
					RecipeBook.remove({ _id: id }, function (err0, result0) {
						if (err) {
							handleError(err0, req, res);
						} else {
							//remove from current user
							User.update({ _id: req.user._id }, { $pull: { recipeBooks: id } }, function (err01, result01) {
								if (err01) {
									handleError(err01, req, res);
								} else {
									res.status(200).send();
								}
							})
						}
					})
				}
			}
		})
	},

	deleteShareable: function (req, res) {
		//remove from user
		User.findByIdAndUpdate(req.user._id, { $pull: { recipeMail: req.params.id } }, function (err, result) {
			if (err) {
				handleError(err, req, res);
			} else {
				//remove from shareables
				Shareable.remove({ _id: req.params.id }, function (err2, result2) {
					if (err2) {
						handleError(err2, req, res);
					} else {
						res.json(result2);
					}
				})
			}
		})
	},

	addRecipe: function (req, res) {
		var info = req.body;
		console.log('GOT', info);
		//first add recipe
		Recipe.create(info.recipe, function (err, result) {
			if (err) {
				handleError(err, req, res);
			} else {
				//Add recipeId to correct recipe book
				var recId = result._id;
				RecipeBook.findByIdAndUpdate(info.id, { $push: { recipes: recId } }, function (err2, result2) {
					if (err2) {
						handleError(err2, req, res);
					} else {
						res.json(result);
					}
				});
			}
		});
	},

	shareRecipe: function (req, res) {
		var info = req.body;
		//build shareable
		var shareMe = {
			recipeId: info.recipeId,
			fromUser: req.user.uname,
			message: info.message,
			isRecipe: info.isRecipe,
			makeCopy: info.makeCopy
		}
		//send to mongo
		User.findOne({ username: info.sendTo }, function (err, result) {
			if (err || !result) {
				//not found user?
				console.log("Didn't find user");
				res.status(400).send('User Not Found');
			} else {
				//found user
				//Create Shareable
				Shareable.create(shareMe, function (err2, result2) {
					if (err2) {
						handleError(err2, req, res);
					} else {
						//created
						//add to user
						User.findByIdAndUpdate(result._id, { $push: { recipeMail: result2._id } }, function (err3, result3) {
							if (err3) {
								handleError(err3, req, res);
							} else {
								res.json(result2);
							}
						});

					}
				});
			}
		})
	},

	getRecipeMail: function (req, res) {
		User.findOne({ _id: req.user._id }).populate('recipeMail').populate('recipeMail.recipeId').exec(function (err, result) {
			if (err) {
				handleError(err, req, res);
			} else {
				res.json(result.recipeMail);
			}
		})
	},

	acceptShare: function (req, res) {
		console.log("SEARCHING REQ", req.body);
		if (req.body.isRecipe) {
			console.log("IS RECIPE");
			var mailToDelete = req.body.mailId;
			var recipeToDuplicate = req.body.recipeId;
			var bookToAddTo = req.body.bookId;
			// console.log("CLONING RECIPE: ", recipeToDuplicate);
			//1) Duplicate Recipe
			Recipe.findById(recipeToDuplicate, function (err, result) {
				if (err || !result) {
					console.error("Could not find recipe to duplicate");
					res.status(500).send('Recipe Not Found');
				} else {
					//Found recipe
					var newRecipe = {
						name: result.name,
						recipeType: result.recipeType,
						ingredients: result.ingredients,
						instructions: result.instructions
					};
					// console.log('   creating new recipe from duplicate');
					Recipe.create(newRecipe, function (err2, result2) {
						if (err2) {
							console.error("Could not create new recipe");
							handleError(err2, req, res);
						} else {
							//Got new recipe!
							
							//Step 2, add recipe id to book
							//also add recipe type if it doesn't exist
							// console.log('   adding recipe to book');
							RecipeBook.findByIdAndUpdate(bookToAddTo, { $push: { recipes: result2._id } }, function (err3, result3) {
								if (err3) {
									console.error("Could not add new recipe to recipebook");
									handleError(err3, req, res);
								} else {
									//added the new recipe.
									//type?
									// console.log('   adding type: ', newRecipe.recipeType);
									RecipeBook.update({ _id: bookToAddTo }, { $addToSet: { sections: newRecipe.recipeType } }, function (err4, result4) {
										if (err4) {
											console.error("Could not add section to recipebook");
											handleError(err4, req, res);
										} else {
											
											// console.log('   updating users recipeMail');
											User.findByIdAndUpdate(req.user._id, { $pull: { recipeMail: mailToDelete } }, function (err5, result5) {
												if (err5) {
													console.error('Could not remove shareable from user');
													handleError(err5, req, res);
												} else {
													//Delete the share mail object
													// console.log('removing shareable');
													Shareable.remove({ _id: mailToDelete }, function (err6, result6) {
														if (err5) {
															console.log("Could not delete shareable");
															handleError(err6, req, res);
														} else {
															//Delete the share mail reference in the user
															// console.log("IT WORKED!!!!!!!!!!!!!!!!!!!!");
															res.send('SUCCESS!');
														}
													})
												}
											})

										}
									})
								}
							})

						}
					})
				}
			})
		} else {
			//Recipe Book Accept
			console.log("IS RECIPE BOOK");
			// res.send();
			// return;
			var mailToRemove = req.body.mailId;
			var bookToCopy = req.body.recipeId;
			if (req.body.makeCopy) {
				console.log("I NEED A COPY");
				RecipeBook.findOne({ _id: bookToCopy }, function (err7, result7) {
					if (err7) {
						handleError(err7, req, res);
					} else {
						var newObj = {
							bookName: result7.bookName,
							oldRecipes: result7.recipes,
							sections: result7.sections,
							recipes: []
						}
						var newRecipes = [];
						//copy all the recipes
						var ready = false;
						var total = newObj.oldRecipes.length;
						newObj.oldRecipes.forEach(function (rid, index) {
							Recipe.findOne({ _id: rid }, function (err0, result0) {
								if (err0) {
									handleError(err0, req, res);
								} else {
									//make copy
									var newRecipe = {
										name: result0.name,
										recipeType: result0.recipeType,
										ingredients: result0.ingredients,
										instructions: result0.ingredients
									}
									Recipe.create(newRecipe, function (err100, result100) {
										if (err100) {
											handleError(err100, req, res);
										} else {
											newRecipes.push(result100._id);
											if(index+1 === total) {
												console.log("READY");
												newObj.recipes = newRecipes;
												//Recipes should be copies
												//Save new recipe book
												RecipeBook.create(newObj, function (err11, result11) {
													if (err11) {
														handleError(err11, req, res);
													} else {
														//new recipe book created
														//add it to current user
														User.update({ _id: req.user._id }, { $push: { recipeBooks: result11._id } }, function (err12, result12) {
															if (err12) {
																handleError(err12, req, res);
															} else {
																//Delete Shareable
																Shareable.remove({ _id: mailToRemove }, function (err13, result13) {
																	if (err13) {
																		handleError(err13, req, res);
																	} else {
																		console.log("COPY OF A RECIPE BOOK SHARE SUCCEEDED");
																		res.json();
																	}
																})
															}
														});
													}
												});
											} else {
												newObj.recipes = newRecipes;												
											}
										}
									})
								}
							})
						})
					}
				});
			} else {
				//Do not copy
				//add bookId to current user
				User.update({ _id: req.user._id }, { $push: { recipeBooks: bookToCopy } }, function (err20, result20) {
					if (err20) {
						handleError(err20, req, res);
					} else {
						RecipeBook.update({ _id: bookToCopy }, { $inc: { contributors: 1 } }, function (err22, result22) {
							if (err22) {
								handleError(err22, req, res);
							} else {
								//delete shareable
								Shareable.remove({ _id: mailToRemove }, function (err21, result21) {
									if (err21) {
										handleError(err21, req, res);
									} else {
										console.log("NOT A COPY RECIPE BOOK SHARE SUCCEEDED");
										res.json();
									}
								});
							}
						});
					}
				});
			}
		}
	},
	
	getMobileData: function(req, res) {
		User.findById(req.user._id, function (err, result) {

			RecipeBook.find({ '_id': { $in: result.recipeBooks } }).populate('recipes').exec(function (err, result) {
				if (err) {
					handleError(err, req, res);
				} else {
					res.json(result);
				}
			})

		})
	}
}

var handleError = function (err, req, res) {
	console.log("ERROR!");
	console.error("Mongo Error: ", err);
	res.status(500).send(err);
}