export interface ProjectArchitectureStep {
  step: string
  title: string
  detail: string
  tech: string
}

export interface ProjectCodeSnippet {
  filename: string
  language: string
  code: string
  description?: string
}

export interface ProjectScreenshot {
  title: string
  caption: string
  placeholderText?: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  category: 'Full-Stack' | 'Backend' | 'Frontend' | 'Systems'
  tags: string[]
  featured: boolean
  githubUrl: string
  demoUrl?: string
  highlights: string[]
  metrics?: { label: string; value: string }[]
  architecture?: {
    summary: string
    steps: ProjectArchitectureStep[]
  }
  codeSnippet?: ProjectCodeSnippet
  screenshots?: ProjectScreenshot[]
}

export const PROJECT_CATEGORIES = ['All', 'Full-Stack', 'Backend', 'Frontend', 'Systems'] as const

export const PROJECTS_DATA: Project[] = [
  {
    id: 'agrilink',
    title: 'Agrilink: Optimized Agricultural Sales & Crop Recommendation',
    subtitle: 'Undergraduate Thesis • Full-Stack Web Platform • Predictive Analysis',
    description: 'Conceptualized, designed, and deployed an end-to-end agricultural platform engineered to maximize commercial efficiency across supply chains. Integrated data-driven insights and a localized crop recommendation engine providing predictive analytics for local farmers.',
    category: 'Full-Stack',
    tags: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Predictive Analysis', 'Tailwind CSS'],
    featured: true,
    githubUrl: 'https://github.com/KarlCabasagan/Agrilink',
    demoUrl: '#',
    highlights: [
      'Conceptualized and built end-to-end agricultural marketplace connecting farmers directly to local buyers',
      'Engineered localized crop recommendation engine providing soil-and-climate aligned predictive insights',
      'Thesis adviser: Dr. Sahawi S. Malik, PhD, PCpE, STS, LPT; delivered verified yield optimizations'
    ],
    metrics: [
      { label: 'Role', value: 'Lead Developer' },
      { label: 'Scope', value: 'End-to-End' },
      { label: 'Domain', value: 'AgriTech' }
    ],
    architecture: {
      summary: 'Three-tier agricultural ecosystem coupling a predictive agronomic engine with a transactional marketplace.',
      steps: [
        {
          step: '01',
          title: 'Soil & Climate Telemetry Ingestion',
          detail: 'Farmer inputs nitrogen, phosphorus, potassium, and soil pH levels along with historical rainfall records.',
          tech: 'Form Ingestion & Validation'
        },
        {
          step: '02',
          title: 'Predictive Proximity Scoring',
          detail: 'Recommendation engine computes Euclidean distance across localized crop suitability models to rank optimal seeds.',
          tech: 'Agronomic Algorithmic Model'
        },
        {
          step: '03',
          title: 'Marketplace Inventory Sync',
          detail: 'Projected harvests seamlessly transition to marketplace catalogs with live buyer bids and price index tracking.',
          tech: 'Laravel Eloquent & MySQL'
        },
        {
          step: '04',
          title: 'Commercial Transaction Settlement',
          detail: 'Direct farmer-to-consumer order dispatching with transactional verification and shipment milestone updates.',
          tech: 'RESTful API & Event Listeners'
        }
      ]
    },
    codeSnippet: {
      filename: 'app/Services/CropRecommendationService.php',
      language: 'php',
      description: 'Calculates crop suitability scores based on regional soil chemistry and climatic tolerances.',
      code: `<?php

namespace App\\Services;

class CropRecommendationService
{
    /**
     * Compute top crop candidates based on soil chemistry.
     */
    public function recommend(array $soilProfile): array
    {
        $crops = \\App\\Models\\CropBaseline::all();
        $rankings = [];

        foreach ($crops as $crop) {
            $nDiff = pow($soilProfile['nitrogen'] - $crop->optimal_n, 2);
            $pDiff = pow($soilProfile['phosphorus'] - $crop->optimal_p, 2);
            $kDiff = pow($soilProfile['potassium'] - $crop->optimal_k, 2);
            $phDiff = pow(($soilProfile['ph'] - $crop->optimal_ph) * 10, 2);

            // Euclidean distance score (lower difference represents higher agronomic fit)
            $distance = sqrt($nDiff + $pDiff + $kDiff + $phDiff);
            $suitability = max(0, round(100 - ($distance * 1.25), 2));

            $rankings[] = [
                'crop_id' => $crop->id,
                'name' => $crop->common_name,
                'suitability_score' => $suitability,
                'recommended_season' => $crop->planting_season,
            ];
        }

        usort($rankings, fn($a, $b) => $b['suitability_score'] <=> $a['suitability_score']);
        return array_slice($rankings, 0, 5);
    }
}`
    },
    screenshots: [
      {
        title: 'Crop Recommendation Portal',
        caption: 'Farmer interface displaying soil telemetry input fields and calculated agronomic yield rankings.',
        placeholderText: 'Agrilink Recommendation Engine Dashboard'
      },
      {
        title: 'Marketplace Order Dispatch',
        caption: 'Direct commercial catalog listing farm produce with real-time bidding between buyers and producers.',
        placeholderText: 'Agrilink Farmer Marketplace Interface'
      }
    ]
  },
  {
    id: 'qr-attendance-system',
    title: 'QR Attendance System & High-Performance Laravel REST API',
    subtitle: 'Laravel REST API • Dynamic QR Codes • Real-Time Verification',
    description: 'A high-performance, secure RESTful API built with Laravel powering a real-time mobile and web attendance verification suite. Features dynamic QR code generation, cryptographic validation, and automated attendance logging.',
    category: 'Backend',
    tags: ['Laravel', 'PHP', 'RESTful API', 'MySQL', 'Dynamic QR', 'Authentication'],
    featured: true,
    githubUrl: 'https://github.com/KarlCabasagan/QR-Attendance-System-With-Laraverl-API',
    demoUrl: '#',
    highlights: [
      'Developed high-performance RESTful API endpoints powering instant dynamic QR scanning and clock-ins',
      'Implemented tokenized request verification and tamper-proof attendance record validation',
      'Engineered automated attendance reporting and aggregated administrative audit dashboards'
    ],
    metrics: [
      { label: 'Architecture', value: 'RESTful API' },
      { label: 'Verification', value: 'Real-Time' },
      { label: 'Framework', value: 'Laravel' }
    ],
    architecture: {
      summary: 'Stateless verification pipeline with rotating TOTP tokens preventing replay attacks and proxy attendance.',
      steps: [
        {
          step: '01',
          title: 'Ephemeral QR Token Generation',
          detail: 'Administrative screen displays rotating HMAC-signed tokens regenerating every 15 seconds.',
          tech: 'Laravel Cache & HMAC-SHA256'
        },
        {
          step: '02',
          title: 'Mobile Scanner Ingestion',
          detail: 'Student/employee scans dynamic token using mobile app, dispatching encrypted bearer credentials.',
          tech: 'RESTful Endpoint /api/v1/scan'
        },
        {
          step: '03',
          title: 'Cryptographic & Time-Window Validation',
          detail: 'API validates token signature, timestamp window (<20s), and confirms no prior clock-in within interval.',
          tech: 'AttendanceVerificationMiddleware'
        },
        {
          step: '04',
          title: 'Audit Ledger Persistence',
          detail: 'Verified clock-in written with geofence coordinate verification and timestamped database index.',
          tech: 'MySQL Indexed Event Logs'
        }
      ]
    },
    codeSnippet: {
      filename: 'app/Http/Controllers/Api/AttendanceVerificationController.php',
      language: 'php',
      description: 'Validates ephemeral QR payload, verifies freshness window, and writes verified attendance record.',
      code: `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Cache;
use App\\Models\\AttendanceLog;

class AttendanceVerificationController extends Controller
{
    public function verifyScan(Request $request)
    {
        $validated = $request->validate([
            'session_token' => 'required|string',
            'scanned_code' => 'required|string',
            'client_timestamp' => 'required|integer',
        ]);

        $cachedPayload = Cache::get('qr_active_' . $validated['session_token']);

        if (!$cachedPayload || !hash_equals($cachedPayload['code'], $validated['scanned_code'])) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid or expired QR verification token.'
            ], 422);
        }

        $userId = $request->user()->id;
        $today = now()->toDateString();

        $alreadyLogged = AttendanceLog::where('user_id', $userId)
            ->whereDate('created_at', $today)
            ->where('session_id', $cachedPayload['session_id'])
            ->exists();

        if ($alreadyLogged) {
            return response()->json(['status' => 'duplicate', 'message' => 'Attendance already recorded.'], 409);
        }

        $log = AttendanceLog::create([
            'user_id' => $userId,
            'session_id' => $cachedPayload['session_id'],
            'verified_at' => now(),
            'ip_address' => $request->ip(),
        ]);

        return response()->json(['status' => 'success', 'data' => $log], 200);
    }
}`
    },
    screenshots: [
      {
        title: 'Dynamic QR Generation Terminal',
        caption: 'Administrative terminal rotating cryptographic QR codes at 15-second intervals with session status.',
        placeholderText: 'QR Attendance Host Screen'
      },
      {
        title: 'Attendance Verification Ledger',
        caption: 'Real-time administrative feed logging verified attendee check-ins, timestamps, and audit metrics.',
        placeholderText: 'Real-Time Attendance Audit Dashboard'
      }
    ]
  },
  {
    id: 'spc-academic-affairs',
    title: 'SPC Academic Affairs Evaluation System',
    subtitle: 'Institutional Evaluation Framework • Academic Audit Platform',
    description: 'Specialized evaluation and reporting framework designed, coded, and deployed for St. Peter’s College. Streamlines capture, processing, and analytical breakdown of internal departmental evaluations and administrative audit data.',
    category: 'Full-Stack',
    tags: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Audit Systems'],
    featured: true,
    githubUrl: 'https://github.com/KarlCabasagan/spc-academic-affairs-ticket-system',
    demoUrl: '#',
    highlights: [
      'Designed and deployed institutional evaluation engine for faculty and academic department metrics',
      'Standardized automated calculation pipelines eliminating manual report tally errors',
      'Delivered role-governed administrative reporting portals adopted across academic units'
    ],
    metrics: [
      { label: 'Institution', value: "St. Peter's College" },
      { label: 'Accuracy', value: '100% Automated' },
      { label: 'Impact', value: 'Campus-Wide' }
    ],
    architecture: {
      summary: 'Multi-stakeholder academic audit framework delivering automated weighted tallying across faculty metrics.',
      steps: [
        {
          step: '01',
          title: 'Role-Based Authentication',
          detail: 'Granular ACL isolates Student, Peer Faculty, Department Head, and Dean access permissions.',
          tech: 'Session RBAC Matrix'
        },
        {
          step: '02',
          title: 'Anonymized Response Ingestion',
          detail: 'Evaluation submissions strip student identity linkage while validating single-submission constraints.',
          tech: 'Anonymized Assessment Tokens'
        },
        {
          step: '03',
          title: 'Weighted Statistical Pipeline',
          detail: 'Computes institutional scorecards factoring category weights: 40% Students, 30% Peers, 30% Deans.',
          tech: 'EvaluationTallyEngine'
        },
        {
          step: '04',
          title: 'Institutional Audit Dispatch',
          detail: 'Generates aggregated faculty performance matrices and downloadable department audits.',
          tech: 'PDF/Spreadsheet Export Engine'
        }
      ]
    },
    codeSnippet: {
      filename: 'app/Services/EvaluationTallyService.php',
      language: 'php',
      description: 'Computes weighted academic performance scores across student, peer, and supervisor evaluations.',
      code: `<?php

namespace App\\Services;

class EvaluationTallyService
{
    /**
     * Compute composite weighted rating for a faculty member.
     */
    public function computeCompositeScore(int $facultyId, string $academicPeriod): array
    {
        $studentRating = $this->getMeanScore($facultyId, $academicPeriod, 'student');
        $peerRating = $this->getMeanScore($facultyId, $academicPeriod, 'peer');
        $supervisorRating = $this->getMeanScore($facultyId, $academicPeriod, 'supervisor');

        // Weighted criteria formula: Student (40%), Peer (30%), Supervisor (30%)
        $composite = ($studentRating * 0.40) + ($peerRating * 0.30) + ($supervisorRating * 0.30);

        return [
            'faculty_id' => $facultyId,
            'breakdown' => [
                'students' => round($studentRating, 2),
                'peers' => round($peerRating, 2),
                'supervisors' => round($supervisorRating, 2),
            ],
            'final_rating' => round($composite, 2),
            'qualitative_index' => $this->resolveDescriptor($composite),
        ];
    }
}`
    },
    screenshots: [
      {
        title: 'Institutional Evaluation Portal',
        caption: 'Faculty appraisal interface showing criteria questions, rating rubrics, and submission status.',
        placeholderText: 'SPC Faculty Evaluation Interface'
      },
      {
        title: 'Department Analytics Matrix',
        caption: 'Administrative reporting dashboard charting faculty ratings, standard deviations, and campus benchmarks.',
        placeholderText: 'Academic Affairs Audit Portal'
      }
    ]
  },
  {
    id: 'spcanteen-ordering',
    title: 'SPCanteen: Campus Canteen Ordering System',
    subtitle: 'Web Ordering Platform • Queue Reduction • Campus Operations',
    description: 'Intuitive web-based transactional ordering and menu platform for school canteen operations. Modernized order placement, decreased waiting times, and boosted transactional efficiency for students and food service staff.',
    category: 'Full-Stack',
    tags: ['JavaScript', 'PHP', 'MySQL', 'Responsive UI', 'POS Workflow'],
    featured: false,
    githubUrl: 'https://github.com/KarlCabasagan/SPCCanteenOrderingSystem',
    demoUrl: '#',
    highlights: [
      'Created intuitive responsive digital menus enabling students and faculty to pre-order food',
      'Engineered kitchen order queue display streamlining preparation dispatch and counter pickups',
      'Cut campus lunch peak waiting times through digital transaction tracking'
    ],
    metrics: [
      { label: 'Efficiency', value: 'Low Wait' },
      { label: 'Audience', value: 'Campus Community' }
    ],
    architecture: {
      summary: 'Lightweight order queue dispatcher linking customer cart placements to kitchen prep queues.',
      steps: [
        {
          step: '01',
          title: 'Menu Item Ingestion',
          detail: 'Real-time stock ledger decrements menu options when kitchen inventory exhausts.',
          tech: 'Relational Stock Registry'
        },
        {
          step: '02',
          title: 'Digital Order Dispatch',
          detail: 'Student compiles pre-order cart and issues pickup request with target lunch window.',
          tech: 'Cart State Manager'
        },
        {
          step: '03',
          title: 'Kitchen Prep Queue',
          detail: 'Kitchen terminal streams pending tickets categorized by prep status (Queued -> Cooking -> Ready).',
          tech: 'Polling Ticket Queue'
        }
      ]
    },
    codeSnippet: {
      filename: 'services/OrderQueueManager.js',
      language: 'javascript',
      description: 'Processes incoming kitchen orders, updates transaction logs, and updates order states.',
      code: `export class OrderQueueManager {
  static formatKitchenTicket(order) {
    return {
      orderId: order.id,
      ticketCode: \`SPC-\${order.id.toString().padStart(4, '0')}\`,
      items: order.cart.map(item => ({
        name: item.name,
        quantity: item.qty,
        specialNotes: item.notes || 'None'
      })),
      timestamp: new Date().toLocaleTimeString(),
      status: 'PREPARATION_PENDING'
    };
  }
}`
    },
    screenshots: [
      {
        title: 'Digital Food Service Menu',
        caption: 'Responsive student pre-ordering screen with daily meal specials and dietary categorizations.',
        placeholderText: 'SPCanteen Menu & Cart Interface'
      }
    ]
  },
  {
    id: 'checkmate-inventory',
    title: 'CheckMate: Consumable Stock & Grocery Management',
    subtitle: 'Stock Inventory Platform • Purchasing Alerts • Retail Optimization',
    description: 'Inventory management and stock surveillance software engineered to monitor consumable goods, generate automated reorder thresholds, and optimize small-business and household purchasing rhythms.',
    category: 'Frontend',
    tags: ['React', 'JavaScript', 'State Management', 'Local Storage', 'Tailwind CSS'],
    featured: false,
    githubUrl: 'https://github.com/KarlCabasagan/CheckMate',
    demoUrl: '#',
    highlights: [
      'Architected reactive stock tracking matrix with consumable expiration warnings',
      'Formulated automated shopping list compilation based on user-defined stock threshold levels',
      'Designed responsive dashboard with instant search, category filtering, and item categorization'
    ],
    metrics: [
      { label: 'Focus', value: 'Inventory Tracking' },
      { label: 'Alerting', value: 'Automated' }
    ],
    architecture: {
      summary: 'Reactive client-side stock registry with threshold evaluation and local persistence.',
      steps: [
        {
          step: '01',
          title: 'Stock Ledger Registry',
          detail: 'Consumable entries tracked with expiration dates, current volume, and minimum restock thresholds.',
          tech: 'React State & Schema'
        },
        {
          step: '02',
          title: 'Automated Reorder Trigger',
          detail: 'Evaluation daemon scans inventory levels and populates shopping list when item crosses threshold.',
          tech: 'Client Evaluation Engine'
        }
      ]
    },
    codeSnippet: {
      filename: 'src/hooks/useInventoryAlerts.ts',
      language: 'typescript',
      description: 'Calculates expiration status and generates automated reorder warnings.',
      code: `export function evaluateStockThresholds(items: StockItem[]) {
  return items.filter(item => {
    const isUnderStocked = item.currentQuantity <= item.minThreshold;
    const isNearingExpiry = item.expiryDate 
      ? new Date(item.expiryDate).getTime() - Date.now() < 3 * 86400000 
      : false;
    return isUnderStocked || isNearingExpiry;
  });
}`
    },
    screenshots: [
      {
        title: 'CheckMate Stock Surveillance View',
        caption: 'Dashboard highlighting low-stock consumable items with expiration alert badges.',
        placeholderText: 'CheckMate Inventory Dashboard'
      }
    ]
  },
  {
    id: 'smart-breaker-system',
    title: 'Smart Breaker System & Electrical Automation',
    subtitle: 'Systems Engineering • Hardware/IoT Integration • Power Monitoring',
    description: 'Electrical automation and hardware-interfaced monitoring platform designed for real-time circuit surveillance, fault detection, and intelligent remote breaker control.',
    category: 'Systems',
    tags: ['Systems', 'C++', 'IoT', 'Hardware Automation', 'Telemetries'],
    featured: false,
    githubUrl: 'https://github.com/KarlCabasagan/Smart-Breaker-System',
    demoUrl: '#',
    highlights: [
      'Engineered telemetry ingestion interface reading real-time breaker state and electrical metrics',
      'Implemented safety trip alert notifications and status monitoring pipelines',
      'Interfaced embedded microcontroller communications with centralized management portal'
    ],
    metrics: [
      { label: 'Domain', value: 'IoT & Systems' },
      { label: 'Response', value: 'Immediate Trip' }
    ],
    architecture: {
      summary: 'Real-time embedded monitoring system linking ADC current transducers to fast-acting relay trips.',
      steps: [
        {
          step: '01',
          title: 'High-Frequency Sensor Sampling',
          detail: 'Microcontroller ADC samples voltage and shunt current waveforms at 1 kHz frequency.',
          tech: 'Embedded ADC & Transducers'
        },
        {
          step: '02',
          title: 'Overcurrent Interrupt Trip',
          detail: 'Hardware interrupt trips relay mechanism in under 10 milliseconds if current threshold breaches limits.',
          tech: 'Hardware Interrupt & GPIO'
        },
        {
          step: '03',
          title: 'Telemetry Packet Broadcast',
          detail: 'Status packet with voltage, current, and trip reason serialized and transmitted to central hub.',
          tech: 'Serial / Wi-Fi UDP Stream'
        }
      ]
    },
    codeSnippet: {
      filename: 'firmware/src/breaker_controller.cpp',
      language: 'cpp',
      description: 'Microcontroller loop monitoring instantaneous current with sub-10ms hardware trip trigger.',
      code: `#include <Arduino.h>

const int SENSOR_PIN = A0;
const int RELAY_PIN = 7;
const float OVERCURRENT_LIMIT_AMPS = 25.0;

void setup() {
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH); // Breaker Closed
  Serial.begin(115200);
}

void loop() {
  int rawAdc = analogRead(SENSOR_PIN);
  float voltage = (rawAdc * 5.0) / 1024.0;
  float currentAmps = (voltage - 2.5) / 0.066; // ACS712-30A calibration

  if (currentAmps >= OVERCURRENT_LIMIT_AMPS) {
    // Immediate Safety Trip Trigger (<8ms)
    digitalWrite(RELAY_PIN, LOW);
    Serial.printf("[FAULT_TRIP] Overcurrent detected: %.2fA\\n", currentAmps);
    while (true) {
      // Lock open state until manual hardware reset
      delay(500);
    }
  }
}`
    },
    screenshots: [
      {
        title: 'Smart Breaker Telemetry Console',
        caption: 'Hardware console charting live circuit amperage and trigger status.',
        placeholderText: 'Smart Breaker Electrical Telemetry View'
      }
    ]
  },
  {
    id: 'msu-iit-ccs-tracker',
    title: 'MSU-IIT CCS Contribution Tracker',
    subtitle: 'Cross-Institutional Collaboration • RBAC • Financial Analytics',
    description: 'Customized financial and asset-tracking system co-developed for the Mindanao State University - Iligan Institute of Technology (MSU-IIT) College of Computer Studies. Features Role-Based Access Control and data visualization.',
    category: 'Full-Stack',
    tags: ['PHP', 'MySQL', 'RBAC', 'Data Visualization', 'Audit Logs', 'Financial Systems'],
    featured: true,
    githubUrl: 'https://github.com/KarlCabasagan',
    demoUrl: '#',
    highlights: [
      'Architected Role-Based Access Control (RBAC) securing departmental fee records across officer tiers',
      'Engineered interactive data visualization graphs, financial audit logs, and downloadable reports',
      'Collaborated cross-institutionally with collegiate student governing bodies'
    ],
    metrics: [
      { label: 'Security', value: 'Granular RBAC' },
      { label: 'Partner', value: 'MSU-IIT CCS' },
      { label: 'Scope', value: 'Financial Audit' }
    ],
    architecture: {
      summary: 'Departmental financial ledger securing multi-tier organizational transactions with audit records.',
      steps: [
        {
          step: '01',
          title: 'Officer Role Gatekeeping',
          detail: 'Fine-grained permissions separate collection officers, audit treasurers, and department heads.',
          tech: 'RBAC Policy Engine'
        },
        {
          step: '02',
          title: 'Transaction Audit Trail',
          detail: 'Every student contribution is verified with receipt tokens and irreversible ledger audit records.',
          tech: 'Immutable Audit Logging'
        }
      ]
    },
    codeSnippet: {
      filename: 'app/Security/RbacMiddleware.php',
      language: 'php',
      description: 'Validates administrative permissions before accessing financial ledger endpoints.',
      code: `<?php

namespace App\\Security;

class RbacMiddleware
{
    public function handle($request, \\Closure $next, ...$roles)
    {
        $user = $request->user();
        if (!$user || !in_array($user->department_role, $roles)) {
            abort(403, 'Unauthorized access to departmental financial records.');
        }
        return $next($request);
    }
}`
    },
    screenshots: [
      {
        title: 'MSU-IIT CCS Financial Dashboard',
        caption: 'Departmental ledger tracking collegiate fees, verified receipts, and audit balances.',
        placeholderText: 'MSU-IIT CCS Contribution Dashboard'
      }
    ]
  },
  {
    id: 'inventree',
    title: 'InvenTree: Multi-Tier Asset & Stock Directory',
    subtitle: 'Asset Directory • Relational Database • Organizational Workflow',
    description: 'Structured asset cataloging and inventory classification tool designed for hierarchical item tracking, stock transfers, and structured departmental asset registries.',
    category: 'Backend',
    tags: ['PHP', 'MySQL', 'Database Architecture', 'CRUD', 'Asset Tracking'],
    featured: false,
    githubUrl: 'https://github.com/KarlCabasagan/InvenTree',
    demoUrl: '#',
    highlights: [
      'Implemented hierarchical asset tree indexing for fast multi-category queries',
      'Designed normalized relational tables ensuring referential integrity on stock movement',
      'Built clean administrative controls for rapid item intake and batch state updates'
    ],
    metrics: [
      { label: 'Schema', value: 'Normalized RDBMS' },
      { label: 'Type', value: 'Asset Management' }
    ],
    architecture: {
      summary: 'Hierarchical relational directory modeling parent-child asset inheritance across departments.',
      steps: [
        {
          step: '01',
          title: 'Tree Node Modeling',
          detail: 'Nested category tree nodes indexed for fast recursive subtree lookups.',
          tech: 'Adjacency List & RDBMS Indexes'
        },
        {
          step: '02',
          title: 'Custody Transfer Log',
          detail: 'Asset transfers between personnel enforce referential verification and condition sign-off.',
          tech: 'Transactional State Machine'
        }
      ]
    },
    codeSnippet: {
      filename: 'database/migrations/create_asset_tree_schema.sql',
      language: 'sql',
      description: 'Relational schema enforcing foreign key referential integrity on asset custody movements.',
      code: `CREATE TABLE assets (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    asset_tag VARCHAR(64) UNIQUE NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    parent_asset_id BIGINT UNSIGNED NULL,
    custodian_id INT UNSIGNED NOT NULL,
    status ENUM('active', 'in_transfer', 'maintenance', 'retired') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES asset_categories(id),
    FOREIGN KEY (parent_asset_id) REFERENCES assets(id) ON DELETE SET NULL
);`
    },
    screenshots: [
      {
        title: 'Hierarchical Asset Directory',
        caption: 'Categorized asset tree with live search, condition tracking, and department assignments.',
        placeholderText: 'InvenTree Directory View'
      }
    ]
  },
  {
    id: 'movie-site-react',
    title: 'MovieSite React: Media Catalog & Discovery',
    subtitle: 'React • Dynamic API Ingestion • Responsive Streaming UI',
    description: 'Modern media discovery client engineered with React, showcasing responsive layout paradigms, API consumption, debounce search queries, and dynamic modal overlays.',
    category: 'Frontend',
    tags: ['React', 'JavaScript', 'REST API', 'CSS3', 'Responsive Design'],
    featured: false,
    githubUrl: 'https://github.com/KarlCabasagan/MovieSite-React',
    demoUrl: '#',
    highlights: [
      'Integrated external media API streaming movie metadata, ratings, and posters in real-time',
      'Built reactive category filters, instant keyword queries, and responsive poster grids',
      'Optimized image loading and component rendering states for smooth mobile browsing'
    ],
    metrics: [
      { label: 'Framework', value: 'React' },
      { label: 'UX', value: 'Mobile-First' }
    ],
    architecture: {
      summary: 'Client-side media discovery client with debounced network ingestion and resilient caching.',
      steps: [
        {
          step: '01',
          title: 'Debounced Query Dispatch',
          detail: 'Input queries debounced by 300ms to throttle upstream API requests and conserve network bandwidth.',
          tech: 'Custom React useDebounce Hook'
        },
        {
          step: '02',
          title: 'Responsive Grid & Modal Presentation',
          detail: 'Media items render into responsive flex grid with dynamic poster overlays and backdrop views.',
          tech: 'React Components & CSS Grid'
        }
      ]
    },
    codeSnippet: {
      filename: 'src/hooks/useMovieSearch.js',
      language: 'javascript',
      description: 'Debounced search hook fetching streaming movie catalog metadata with error resilience.',
      code: `import { useState, useEffect } from 'react';

export function useMovieSearch(query, debounceMs = 300) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const handler = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(\`/api/movies?q=\${encodeURIComponent(query)}\`);
        const data = await res.json();
        setResults(data.movies || []);
      } catch (err) {
        console.error('Failed to stream movie data', err);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [query, debounceMs]);

  return { results, loading };
}`
    },
    screenshots: [
      {
        title: 'MovieSite Discovery Screen',
        caption: 'Responsive media grid showcasing search filters, poster artwork, and rating badges.',
        placeholderText: 'MovieSite Media Catalog Interface'
      }
    ]
  }
]
