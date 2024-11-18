const noble = require('@abandonware/noble');
const Smartwatch = require('../models/smartwatchModel');

const smartwatchService = {
    syncData: async (userId, smartwatchData) => {
        try {
            const result = await Smartwatch.findOneAndUpdate(
                { userId: userId },
                { data: smartwatchData, lastSync: Date.now() },
                { new: true, upsert: true }
            );
            return result;
        } catch (error) {
            throw new Error('Error syncing smartwatch data');
        }
    },

    startBluetoothSync: async (userId) => {
        return new Promise((resolve, reject) => {
            noble.on('stateChange', (state) => {
                if (state === 'poweredOn') {
                    console.log('Bluetooth encendido, comenzando escaneo...');
                    noble.startScanning([], false);
                } else {
                    console.log('Bluetooth apagado');
                    noble.stopScanning();
                    reject('Bluetooth no está disponible');
                }
            });

            noble.on('discover', async (peripheral) => {
                console.log(`Dispositivo encontrado: ${peripheral.advertisement.localName}`);
                
                noble.stopScanning(); // Detén el escaneo al encontrar el dispositivo
                peripheral.connect((error) => {
                    if (error) {
                        console.error('Error al conectar:', error);
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

                        // Aquí procesas las características del dispositivo
                        characteristics.forEach((characteristic) => {
                            console.log(`Característica encontrada: ${characteristic.uuid}`);
                            // Leer datos
                            characteristic.read((err, data) => {
                                if (err) {
                                    console.error('Error leyendo datos:', err);
                                    reject(err);
                                } else {
                                    console.log(`Datos sincronizados: ${data.toString('utf-8')}`);
                                    // Guarda los datos en la base de datos
                                    Smartwatch.create({
                                        userId: userId,
                                        data: JSON.parse(data.toString('utf-8')),
                                    });
                                    resolve('Sincronización completa');
                                }
                            });
                        });
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
