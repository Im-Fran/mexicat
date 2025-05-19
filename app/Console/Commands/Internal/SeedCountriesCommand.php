<?php

namespace App\Console\Commands\Internal;

use App\Models\Country;
use GuzzleHttp\Client;
use Illuminate\Console\Command;

const COUNTRIES_URI = 'https://github.com/dr5hn/countries-states-cities-database/raw/refs/heads/master/json/countries.json';

class SeedCountriesCommand extends Command {
    protected $signature = 'internal:seed-countries';

    protected $description = 'Seeds the countries based on the data from dr5hn\'s GitHub repository.';

    public function handle(): void {
        $this->info('Downloading countries...');
        $client = new Client();
        $contents = $client->get(COUNTRIES_URI, [])->getBody()->getContents();
        $countries = collect(json_decode($contents, true))
            ->map(fn ($it) => [
                ...$it,
                'translations' => json_encode($it['translations']),
                'timezones' => json_encode($it['timezones']),
            ]);

        $this->info('Seeding countries...');
        $this->withProgressBar($countries, function($country) {
            $id = $country['id'];
            unset($country['id']);
            Country::firstOrCreate(['id' => $id], $country);
        });
    }
}
