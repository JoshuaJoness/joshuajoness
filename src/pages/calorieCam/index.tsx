import React from "react"
import { Link } from "gatsby"
import Emoji from "react-emoji-render";
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Header from "../../components/header"


const CalorieCam = () => (
  <Layout>
    <SEO title="Calorie Cam" />
    {/* <img src="./calorieCam.png" alt="" /> */}
    <div style={{ display:'grid', gridTemplateColumns:'10% 20% 60% 10% ', height:'80vh', backgroundColor:'#525252' }}>
      <div />
      <img src="./calorieCam2.PNG" alt="" style={{ height: '90%', margin:'auto', paddingBottom:'5%'}}/>
      <div style={{fontFamily:"'Knewave', cursive",display:'flex', flexDirection:'column', color:'#FFF', fontSize: 20, marginLeft: '25%', paddingTop:'5%'}}>
        <h1 style={{fontFamily:"'Knewave', cursive", color:'#B9E4C9'}}>What This App Does</h1>
        <p>Step 1. Takes picture of food using React Native Camera.</p>
          <ul style={{fontFamily:'Arial'}}>
            <li>We decalre an asynchronous function (to request camera)</li>
            <li>We await the user's permission (for camera)</li>
            <li>We store the image data in base 64 (to send to API)</li>
            <li>We store the images uri to display the image for our user</li>
          </ul>
          <pre style={{width:'100%', margin:'auto', marginTop:'2.5%', marginBottom:'2.5%'}}>
      <code>
           { 
           `const takePicture = async () => {
            await Permissions.askAsync(Permissions.CAMERA);
            const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
              allowsEditing: false,
              base64: true
            });
            setImage(base64);
            setImageToDisplay(uri)
          };`}
      </code>
    </pre>
      </div>
      <div />
    </div>

    <div style={{ display:'flex', backgroundColor:'#EEE', paddingTop:'5%', paddingLeft:'3%', paddingBottom: '5%' }}>
        <div style={{fontFamily:"'Knewave', cursive",display:'flex', flexDirection:'column', color:'#FFF', fontSize: 20}}>
          <p style={{fontFamily:"'Knewave', cursive", color:'#FD5523', fontSize:50}}>Step 2. Send picture to Clarifai API.</p>
          <ul style={{color:'black', marginTop:'3%', fontFamily:'Arial'}}>
            <li>We create a new instance of the Clarifai app</li>
            <li>We upload the user's picture to Clarifai, which returns a prediction of the food item</li>
            <li>We extract the name of this food item and send this name to Edamam API (a nutritional database)</li>
            <li>Then we use Edamam's response to store the name of the food and its nutrional information in our state variables</li>
            <li>We set showResults to 'true' to trigger our results screen</li>
            <li>Lastly we run clear() to clean up, this ensures app keeps running smoothly</li>
          </ul>
          <pre style={{marginTop:'3%'}}>
            <code style={{color:'black'}}>
           { 
           `const Clarifai = require('clarifai');
           const app = new Clarifai.App({
            apiKey: '****************'
           });
           
           
           const predict = () =>	{
            app.models.predict("bd367be194cf45149e75f01d59f77ba7", {base64:image}).then(
              function(response){
                let tag = response.rawData.outputs[0].data.concepts[0].name;
                  axios.get(\n\`https://api.edamam.com/api/food-database/parser?app_id=7ff1ee7e&app_key=aa4824adda205d7ff601301c08816573&ingr=$\n\{tag}\n\`)
                    .then(res => {
                      setLabel(res.data.hints[0].food.label)
                      setCalories(res.data.hints[0].food.nutrients.ENERC_KCAL/100)
                      setCarbs(res.data.hints[0].food.nutrients.CHOCDF/100)
                      setProtein(res.data.hints[0].food.nutrients.PROCNT/100)
                      setFat(res.data.hints[0].food.nutrients.FAT/100)
                      setObject({label:res.data.hints[0].food.label,
                        calories:res.data.hints[0].food.nutrients.ENERC_KCAL/100*grams,
                        carbs:res.data.hints[0].food.nutrients.CHOCDF/100*grams,
                        protein:res.data.hints[0].food.nutrients.PROCNT/100*grams,
                        fat:res.data.hints[0].food.nutrients.FAT/100*grams,
                        date:date
                      })
                      setShowResults(true)
                    })
                    .catch(err => {
                      console.log(err)})
                  },
                  function(err){
                    console.log(err)
                  }
                )
              clear()
              }`}
            </code>
          </pre>
        </div>
        <img src="./calorieCam4.PNG" alt="" style={{ width: '20%', margin:'auto', marginTop:'1%'}}/>
    </div>

    <div style={{ display:'grid', gridTemplateColumns:'10% 20% 60% 10% ', backgroundColor:'#525252' }}>
      <div />
      <img src="./calorieCam5.PNG" alt="" style={{ height: '90%', margin:'auto', paddingBottom:'5%'}}/>
      <div style={{fontFamily:"'Knewave', cursive",display:'flex', flexDirection:'column', color:'#FFF', fontSize: 20, marginLeft: '25%', paddingTop:'5%'}}>
        <h1 style={{fontFamily:"'Knewave', cursive", color:'#B9E4C9'}}>Step 3. Display Results</h1>
        <p>Step 1. Takes picture of food using React Native Camera.</p>
          <ul style={{fontFamily:'Arial'}}>
            <li>Above, after receiving the image prediction, we then made another API call to Edamam to retrieve nutritional information</li>
            <li>We display the nutritional infromtion for the user, giving them the option to control the amount (grams)</li>
            <li>We update the nutritonal information by multiplying it by the amount of grams</li>
            <li>Since grams is a state variable, our component re-renders on change and displays instant information</li>
          </ul>
          <pre style={{width:'100%', margin:'auto', marginTop:'2.5%', marginBottom:'2.5%'}}>
      <code>
           { 
           `<View>
           <Text>{Math.round(calories*grams)}</Text>
           <Text>{isNaN(protein) ? 'n/a' : Math.round(protein)*grams}</Text>
           <Text>{isNaN(carbs) ? 'n/a' : Math.round(carbs)*grams}</Text>
           <Text>{isNaN(fat) ? 'n/a' : Math.round(fat)*grams}</Text>
         </View>`}
      </code>
    </pre>
    <ul>
      <li>Once the user is satisfied, they can log their item</li>
    </ul>
    <pre style={{width:'100%', margin:'auto', marginTop:'2.5%', marginBottom:'2.5%'}}>
      <code>
           { 
           `    const setAsync = async () => {
            try {
              let obj = object
              let foods = await AsyncStorage.getItem('foods') || '[]'
              foods = JSON.parse(foods)
              foods.push(obj)
              await AsyncStorage.setItem('foods', JSON.stringify(foods)).then(() => {
                goToLog()
              })
            }
            catch(error) {
              alert(error)
            }
          }`}
      </code>
    </pre>
          
      </div>
      <div />
    </div>

    <div style={{ display:'flex', backgroundColor:'#EEE', paddingTop:'5%', paddingLeft:'3%', paddingBottom: '5%' }}>
        <div style={{fontFamily:"'Knewave', cursive",display:'flex', flexDirection:'column', color:'#FFF', fontSize: 20}}>
          <p style={{fontFamily:"'Knewave', cursive", color:'#FD5523', fontSize:50}}>Step 4. View log.</p>
          <ul style={{color:'black', marginTop:'3%', fontFamily:'Arial'}}>
            <li>Here the user can view all of their logged items</li>
            <li>Users are also given the option to clear their log</li>
            <li>We utilize Async Storage to achieve this, storing it on the user's device to avoid having to create and maintain a database</li>
          </ul>
          <pre style={{marginTop:'3%'}}>
            <code style={{color:'black'}}>
           { 
           `  const getAsync = async () => {
            try {
              const value = await AsyncStorage.getItem('foods');
              if (value !== null) {
                // We have data!!
                let parsed = JSON.parse(value)
                await setLoggedFoods(parsed)
              }
            } catch (error) {
              console.log('Error')
            }
          };
        
          const clear = () => {
              AsyncStorage.clear()
              setLoggedFoods([])
              setTotalCalories(0)
              setTotalCarbs(0)
              setTotalProtein(0)
              setTotalFat(0)
              total = 0
              total1 = 0
              total2 = 0
              total3 = 0
            }`
            }
            </code>
          </pre>
        </div>
        <img src="./calorieCam6.PNG" alt="" style={{ width: '20%', margin:'auto', marginTop:'1%'}}/>
    </div>

    <div style={{ backgroundColor:'#525252', paddingBottom:'10%' }}>
      <div />
      <div style={{fontFamily:"'Knewave', cursive",display:'flex', flexDirection:'column', color:'#FFF', fontSize: 20, marginLeft: '25%', paddingTop:'5%'}}>
        <h1 style={{fontFamily:"'Knewave', cursive", color:'#B9E4C9'}}>That's it!</h1>
        <p>View the full project on <a href="https://github.com/JoshuaJoness/calorie-cam" target="blank">GitHub <i class="fab fa-github"></i></a>.</p>
        <p>Download on the App Store <a href="https://apps.apple.com/us/app/calorie-cam/id1511528894?ls=1" target="blank">Calorie Cam</a>.</p>

          
      </div>
      <div />
    </div>
    
  </Layout>
)

export default CalorieCam
