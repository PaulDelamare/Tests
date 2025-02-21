# Lancer le projet
Après avoir récupèrer le projet, faire : 
```bash
cd Tests
```
Puis ensuite installer els dépendances : 
```bash
npm i
```

Et enfin lancer : 
```bash
npm run dev
```

Attention certains tests ne sont pas fait car les calculs de javascript sont défaillant. 2 + 1 peut donner 3.000003 et donc le test ne sera pas concluant.