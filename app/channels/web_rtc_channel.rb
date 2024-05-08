# app/channels/web_rtc_channel.rb
class WebRtcChannel < ApplicationCable::Channel
  def subscribed
    stream_from "web_rtc_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def signal(data)
    ActionCable.server.broadcast("web_rtc_channel", data)
  end
end
