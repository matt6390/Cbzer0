class SongsController < ApplicationController
  def index
    @songs = Song.all
    
    render 'index.json.jbuilder'    
  end

  def show
    @song = Song.find(params[:id])

    render 'show.json.jbuilder'    
  end

  def create
    @song = Song.new(
                      name: params[:name],
                      storage_url: params[:storage_url],
                      user_id: params[:user_id]
                    )
    if @song.save
      # render json: {message: 'song created successfully'}, status: :created
      render 'show.json.jbuilder'
    else
      render json: {errors: @song.errors.full_messages}, status: :bad_request
    end
  end

  def update
    @song = Song.find(params[:id])

    @song.name = params[:name] || @song.name
    @song.storage_id = params[:storage_id] || @song.storage_id

    if @song.save
      render 'show.json.jbuilder'
    else
      render json: {errors: @song.errors.full_messages}, status: :bad_request
    end
  end

  def destroy
    @song = Song.find(params[:id])
    @song.delete

    render json: {message: "Song Removed"}
  end
end
