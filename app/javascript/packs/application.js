// app/javascript/packs/application.js
import consumer from "./channels/consumer"

const peerConnection = new RTCPeerConnection();

// Handling ICE candidates
peerConnection.onicecandidate = event => {
  if (event.candidate) {
    cable.perform('signal', { type: 'candidate', candidate: event.candidate });
  }
};

// Handle incoming data from the signaling channel
const cable = consumer.subscriptions.create("WebRtcChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    if (data.type === 'offer') {
      handleOffer(data.offer);
    } else if (data.type === 'candidate') {
      peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  },

  signal(data) {
    return this.perform('signal', data);
  }
});

function handleOffer(offer) {
  peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  peerConnection.createAnswer().then(answer => {
    peerConnection.setLocalDescription(answer);
    cable.signal({ type: 'answer', answer: answer });
  }).catch(console.error);
}
