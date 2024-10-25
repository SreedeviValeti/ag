#!/bin/bash
TIME=`date +'%Y:%m:%d:%T:%N%b%a' `
backupfoldername=htmlbackupfolder
backupfilename=html$TIME
echo "navigating to cd /usr/share/nginx directory"
cd /usr/share/nginx
echo "create aback up folder"
sudo mkdir $backupfoldername
echo "Taking the Back up copy of HTMl Folder/angular dist fies"
sudo zip -r $backupfoldername/$backupfilename.zip html/angular
#html/index.html html/styles*.css html/runtime*.js html/polyfills*.js html/main*.js html/favicon.ico html/3rdpartylicenses.txt html/appspec.yml html/scripts
#sudo  tar -cvpzf /$backupfoldername/$backupfilename.tar.gz html
echo "removing the existing index file along with angular dist files"
sudo rm -rf html/angular
#sudo rm html/index.html html/styles*.css html/runtime*.js html/polyfills*.js html/main*.js html/favicon.ico html/3rdpartylicenses.txt html/appspec.yml
#sudo rm -rf html/scripts

#sudo cp -R /home/ec2-user/angularbuildwest2/* /usr/share/nginx/html/



  