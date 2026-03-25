class HomeController < ApplicationController
  def index
    @portfolio = PORTFOLIO_DATA
  end
end
