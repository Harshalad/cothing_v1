RunLocal:
	npm run dev

updev:
	cp .env.dev .env.local 
	make RunLocal

upstag:
	cp .env.stag .env.local 
	make RunLocal
upprod:
	cp .env.prod .env.local 
	make RunLocal

uplatprod:
	cp .env.latestProd .env.local 
	make RunLocal


deploydev:
	cp .env.dev .env.local 
	git checkout development
	git pull
	git merge -
	git push
	cp firebase.json firebase.copy.json
	cp firebase.dev.json firebase.json
	npm run build
	firebase deploy --only hosting:nworx4dev
	cp firebase.copy.json firebase.json
	git checkout -

deploystag:
	cp .env.stag .env.local 
	git checkout development 
	git pull
	git checkout staging
	git pull
	git merge development 
	git push
	cp firebase.json firebase.copy.json
	cp firebase.stag.json firebase.json
	npm run build
	firebase deploy --only hosting --project nworx4staging
	cp firebase.copy.json firebase.json
	git checkout devFeature

deploystagwithoutpush:
	cp .env.stag .env.local 
	cp firebase.stag.json firebase.json
	npm run build
	firebase deploy --only hosting --project nworx4staging
	cp firebase.copy.json firebase.json

devDeploy:
	git checkout N4dev
	git pull
	git merge -
	git push
	cp .env.dev .env.local 
	cp firebase.json firebase.copy.json
	cp firebase.dev.json firebase.json
	npm run build
	firebase deploy --only hosting:nworx4dev
	cp firebase.copy.json firebase.json
	git checkout -

stageDeploy:
	git checkout N4staging
	git pull
	git merge -
	git push
	cp .env.stag .env.local 
	cp firebase.json firebase.copy.json
	cp firebase.stag.json firebase.json
	npm run build
	firebase deploy --only hosting --project nworx4staging
	cp firebase.copy.json firebase.json
	git checkout -

prodDeploy:
	git checkout N4prod
	git pull
	git merge -
	git push
	cp .env.prod .env.local 
	cp firebase.json firebase.copy.json
	cp firebase.prod.json firebase.json
	npm run build
	firebase deploy --only hosting --project nworx4prod
	cp firebase.copy.json firebase.json
	git checkout -

latprodDeploy:
	git checkout N4prod
	git merge -
	git push
	cp .env.latestProd .env.local 
	cp firebase.json firebase.copy.json
	cp firebase.latestProd.json firebase.json
	npm run build
	firebase deploy --only hosting --project nworx4prod
	cp firebase.copy.json firebase.json
	git checkout -
	