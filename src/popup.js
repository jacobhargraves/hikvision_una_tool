'use strict';
import AxiosDigestAuth from '@mhoc/axios-digest-auth';

import './popup.css';

document.addEventListener('DOMContentLoaded', function () {
  const runUNAButton = document.getElementById('runUNAButton');
  const firmwareEl = document.getElementById('firmware');
  const alarmServerEl = document.getElementById('alarmServer');
  const rulesActiveEl = document.getElementById('rulesActive');

  // This function grabs the username and password from the user and uses that to make a request to the camera api
  runUNAButton.addEventListener('click', function (event) {

      //prevent the form from automatically resetting
      event.preventDefault();
      firmwareEl.textContent = 'Firmware: ';
      alarmServerEl.textContent = 'Alarm Server: '
      rulesActiveEl.textContent = 'Rules Active: '

      // retrieve and log the username and password
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      console.log('Username:', username);
      console.log('Password:', password);

      const url = 'http://10.23.252.154:5020/ISAPI/Event/notification/httpHosts';

        const digestAuth = new AxiosDigestAuth({
          username: username,
          password: password,
        });
        
        const MakeARequest = async (url) => {
          const response = await digestAuth.request({
            headers: { Accept: "application/xml" },
            method: "GET",
            url: url,
          });
          return response;
        }
        console.log(MakeARequest(url));
  });
});
