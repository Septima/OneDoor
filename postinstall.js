#!/usr/bin/env node
import * as fs from 'fs';

const root=process.env.INIT_CWD
const config_folder=root+'/config'
const src=root+'/node_modules/@septima/onedoor-server/config'



if (fs.existsSync(config_folder) ) {
    console.log('Has config folder. Exiting..')
}
else {
    console.log('No config folder, creating a sensible default')
    fs.cp(src+'/onedoor', config_folder+'/onedoor', { recursive: true }, (err) => {
        if (err) {
          console.error(err);
        }
      });
      fs.cp(src+'/organisations', config_folder+'/organisations', { recursive: true }, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
    if (fs.existsSync(root+'/web.config') ) {
        console.log('Has already web.config . Exiting..')
    }
    else {
        console.log('creating NEW web.config ..')
   let web_config = `<?xml version="1.0" encoding="UTF-8"?>
   <configuration>
       <appSettings>
           <add key="CONFIG_PATH" value="${root}\config" />
       </appSettings>
       <system.webServer>
           <iisnode
               node_env="%node_env%"
               nodeProcessCountPerApplication="1"
               maxConcurrentRequestsPerProcess="1024"
               maxNamedPipeConnectionRetry="100"
               namedPipeConnectionRetryDelay="250"
               maxNamedPipeConnectionPoolSize="512"
               maxNamedPipePooledConnectionAge="30000"
               asyncCompletionThreadCount="0"
               initialRequestBufferSize="4096"
               maxRequestBufferSize="65536"
               watchedFiles="*.yml"
               uncFileChangesPollingInterval="5000"
               gracefulShutdownTimeout="60000"
               loggingEnabled="true"
               logDirectory="${root}\log"
               debuggingEnabled="true"
               debugHeaderEnabled="false"
               debuggerPortRange="5058-6058"
               debuggerPathSegment="debug"
               maxLogFileSizeInKB="128"
               maxTotalLogFileSizeInKB="1024"
               maxLogFiles="20"
               devErrorsEnabled="true"
               flushResponse="false"
               enableXFF="false"
               promoteServerVars="LOGON_USER"
               configOverrides="iisnode.yml"
           />
           <handlers>
               <add name="iisnode" path="node_modules/@septima/onedoor-server/index.cjs" verb="*"
                   modules="iisnode" />
           </handlers>
           <rewrite>
               <rules>
                   <rule name="onedoor-server">
                       <match url="/*" />
                       <action type="Rewrite" url="node_modules/@septima/onedoor-server/index.cjs" />
                   </rule>
               </rules>
           </rewrite>
       </system.webServer>
   </configuration>` 
   fs.writeFile(root+'/web.config', web_config, err => {
       if (err) {
           console.error(err);
       } else {
           // file written successfully
       }
       });
   
    }