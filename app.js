const peer = new Peer();
let ownPeerId;

peer.on('open', (id) => {
    ownPeerId = id;
    document.getElementById('own-peer-id').innerText = id;
    console.log('My peer ID is: ' + id);
});

function connectToPeer() {
    const peerIdInput = document.getElementById('peer-id-input');
    const destinationPeerId = peerIdInput.value;

    if (destinationPeerId && destinationPeerId !== ownPeerId) {
        const conn = peer.connect(destinationPeerId);

        conn.on('open', () => {
            console.log('Connection open');
        });

        conn.on('data', (data) => {
            appendMessage(data, 'incoming');
        });

        peerIdInput.value = '';
    } else {
        alert('Please enter a valid Peer ID');
    }
}