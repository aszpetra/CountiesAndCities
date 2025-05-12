<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>Megyék és városaik</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])

</head>
<body>
<div id="county-div" class="flex-box">
    <h1>Megyék és városaik</h1>
</div>
    <div id="county-div" class="flex-box">
        <label for="county-select" class="items">Válasszon megyét:</label>
        <select id="county-select" class="items" name="county_id">
            <option value="">-- Válasszon --</option>
            @foreach($counties as $county)
                <option value="{{ $county->id }}">{{ $county->name }}</option>
            @endforeach
        </select>
    </div>

    <div  id="form-div" class="flex-box" style="display:none;">
        <form id="city-form" class="form-group" style="display:none;">
            <label for="city-name" class="items">Város neve:</label>
            <input type="text" id="city-name" class="items" name="city_name">
            <button type="submit" id="add-city-btn" class="items">Hozzáadás</button>
        </form>
    </div>

    <div id="city-list" class="flex-box" style="display:none;"></div>
</body>
</html>
