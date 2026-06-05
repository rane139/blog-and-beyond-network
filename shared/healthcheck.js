
const axios = require('axios');

async function pingStart(healthchecksUrl) {
  if (!healthchecksUrl) return;
  try {
    await axios.get(`${healthchecksUrl}/start`, { timeout: 5000 });
    console.log('🟢 Healthchecks: Job started');
  } catch (e) {
    console.error('⚠️  Healthchecks start ping failed:', e.message);
  }
}

async function pingSuccess(healthchecksUrl) {
  if (!healthchecksUrl) return;
  try {
    await axios.get(healthchecksUrl, { timeout: 5000 });
    console.log('🟢 Healthchecks: Job completed successfully');
  } catch (e) {
    console.error('⚠️  Healthchecks success ping failed:', e.message);
  }
}

async function pingFailure(healthchecksUrl, errorMessage) {
  if (!healthchecksUrl) return;
  try {
    await axios.post(`${healthchecksUrl}/fail`, {
      error: errorMessage.substring(0, 500)
    }, { timeout: 5000 });
    console.log('🔴 Healthchecks: Failure reported');
  } catch (e) {
    console.error('⚠️  Healthchecks failure ping failed:', e.message);
  }
}

module.exports = { pingStart, pingSuccess, pingFailure };