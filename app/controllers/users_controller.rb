class UsersController < ApplicationController
  def index
    @users = User.all 

    render 'index.json.jbuilder'
  end

  def show
    @user = current_user

    render 'show.json.jbuilder'
  end

  def create
    @user = User.new(
      name: params[:name],
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    )
    if @user.save
      # render json: {message: 'User created successfully'}, status: :created
      render 'show.json.jbuilder'
    else
      render json: {errors: @user.errors.full_messages}, status: :bad_request
    end
  end

  def update
    @user = User.find(current_user.id)

    @user.name = params[:name] || @user.name
    @user.email = params[:email] || @user.email
    @user.password = params[:password] || @user.password
    @user.password_confirmation = params[:password_confirmation] || @user.password_confirmation

    if @user.save
      render json: {message: "User Updated succesfully"}
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.delete

    render json: {message: "User Removed"}
  end
end
