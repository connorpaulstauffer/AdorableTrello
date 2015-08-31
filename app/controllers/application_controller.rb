class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def log_in_user!(user)
    token = Session.generate_session_token
    user.sessions.create!(session_token: token)
    session[:session_token] = token
  end

  def log_out!
  @current_user = nil
    session_token = session[:session_token]
    Session.find_by_session_token(session_token).destroy!
    session[:session_token] = nil;
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def redirect_unless_logged_in
    unless current_user
      render json: "Please log in first. Try the guest login!", status: :unprocessable_entity
    end
  end

  def create_demo_user(email, password)
    user = User.create!({ email: email, password: password })

    petBoard = Board.create!({ name: "Pets", user: user })

    dogList = List.create!({ name: "Dogs", board: petBoard })
    catList = List.create!({ name: "Cats", board: petBoard })
    rabbitList = List.create!({ name: "Rabbits", board: petBoard })
    bearList = List.create!({ name: "Bears", board: petBoard })
    monkeyList = List.create!({ name: "Monkeys", board: petBoard })
    goatList = List.create!({ name: "Goats", board: petBoard })
    birdList = List.create!({ name: "Birds", board: petBoard })

    Card.create!({
      name: "Spaniel",
      list: dogList,
      image_url: "http://www.about-cocker-spaniels.com/images/cocker-spaniel-4.jpg"
    })
    Card.create!({
      name: "Lab",
      list: dogList,
      image_url: "http://images.nationalgeographic.com/wpf/media-live/photos/000/347/cache/golden-labrador-puppy_34708_990x742.jpg"
    })
    Card.create!({
      name: "Corgi",
      list: dogList,
      image_url: "http://graphics.stanford.edu/~mdfisher/bin/Reddit/aww/After%20years%20of%20searching,%20we%20finally%20got%20the%20Corgi%20pup%20we've%20always%20wanted.%20Meet%20Oliver%20Starfox%20He-Man%20Master%20of%20the%20Universe...Bowser.%20WQqyW.jpg"
    })
    Card.create!({
      name: "French Bulldog",
      list: dogList,
      image_url: "https://www.pets4you.com/images/breeds/french-bulldog_1.jpg"
    })

    Card.create!({
      name: "Persian",
      list: catList,
      image_url: "http://kittensforsale.sg/wp-content/uploads/Persian-Kittens.jpg"
    })
    Card.create!({
      name: "Bengal",
      list: catList,
      image_url: "http://hdwallpapers.cat/wallpaper/bengal_kitten_chair_cute_animals_cats_hd-wallpaper-1888093.jpg"
    })

    return user
  end
end
