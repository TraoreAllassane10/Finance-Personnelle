<?php

namespace Tests\Feature;

use Carbon\Carbon;
use Tests\TestCase;
use App\Models\User;
use App\Models\Category;
use App\Models\Epargne;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EpargneTest extends TestCase
{
    use RefreshDatabase;

    public function test_epargne_stocked(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('epargnes', [
                'date' => Carbon::today(),
                'montant' => 200000,
                'compte' => "Construction de maison",
                'projet' => "La description",
                'user_id' => $user->id
            ]);

        $this->assertCount(1, Epargne::all());
    }

    public function test_epargne_updated(): void
    {

        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('epargnes', [
                'date' => Carbon::today(),
                'montant' => 200000,
                'compte' => "Banque",
                'projet' => "Construction de maison",
                'user_id' => $user->id
            ]);

        $epargne = Epargne::first();

        $this->actingAs($user)
            ->put('epargnes/' . $epargne->id , [
                'date' => Carbon::tomorrow(),
                'montant' => 300000,
                'compte' => "Banque",
                'projet' => "Achat de voiture",
                'user_id' => $user->id
        ]);

        $this->assertEquals(Carbon::tomorrow(), Epargne::first()->date);
        $this->assertEquals(300000, Epargne::first()->montant);
        $this->assertEquals("Achat de voiture", Epargne::first()->projets);
    }

    public function test_epargne_destroyed(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('epargnes', [
                'date' => Carbon::today(),
                'montant' => 200000,
                'compte' => "Banque",
                'projet' => "Construction de maison",
                'user_id' => $user->id
            ]);

        $epargne = Epargne::first();

        $this->delete('/epargnes/' . $epargne->id);

        $this->assertCount(0, Epargne::all());
    }
}
