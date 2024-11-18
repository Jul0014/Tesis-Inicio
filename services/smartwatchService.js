const noble = require('@abandonware/noble');

const smartwatchService = {
    startBluetoothSync: () => {
        return new Promise((resolve, reject) => {
            noble.on('stateChange', (state) => {
                if (state === 'poweredOn') {
                    console.log('Bluetooth encendido, comenzando escaneo...');
                    noble.startScanning([], false); // Escanea todos los servicios
                } else {
                    console.log('Bluetooth apagado');
                    noble.stopScanning();
                    reject(new Error('Bluetooth no está disponible'));
                }
            });

            noble.on('discover', (peripheral) => {
                console.log(`Dispositivo encontrado: ${peripheral.advertisement.localName || 'Desconocido'}`);
                noble.stopScanning(); // Detener el escaneo después de encontrar un dispositivo

                peripheral.connect((error) => {
                    if (error) {
                        console.error('Error conectando al dispositivo:', error);
                        reject(error);
                        return;
                    }

                    console.log('Conectado al dispositivo.');

                    peripheral.discoverAllServicesAndCharacteristics((err, services, characteristics) => {
                        if (err) {
                            console.error('Error descubriendo servicios:', err);
                            reject(err);
                            return;
                        }

                        console.log('Servicios y características detectados:');
                        characteristics.forEach((characteristic) => {
                            console.log(`- Característica: ${characteristic.uuid}`);
                        });

                        resolve('Sincronización completada con éxito');
                    });

                    peripheral.on('disconnect', () => {
                        console.log('Dispositivo desconectado.');
                    });
                });
            });
        });
    },
};

module.exports = smartwatchService;
