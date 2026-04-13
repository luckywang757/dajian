/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Calculator, 
  ChevronRight, 
  Info, 
  Package, 
  TrendingUp, 
  Truck, 
  User, 
  CheckCircle2,
  AlertCircle,
  ArrowRightLeft,
  Settings2,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type ContainerType = 'SLEEVE_BOX' | 'REPAIR_BOX' | 'TV_HONEYCOMB' | 'FRIDGE_BOARD' | 'MATTRESS_BAG';

interface MoldData {
  id: string;
  name: string;
  outerL: number;
  outerW: number;
  innerL: number;
  innerW: number;
}

// --- Constants from Image ---

const MOLDS: MoldData[] = [
  { id: 'M1', name: '模具1', outerL: 80, outerW: 60, innerL: 74, innerW: 54 },
  { id: 'M2', name: '模具2', outerL: 86, outerW: 76, innerL: 80, innerW: 70 },
  { id: 'M3', name: '模具3', outerL: 92.6, outerW: 78.8, innerL: 86.6, innerW: 72.8 },
  { id: 'M4', name: '模具4', outerL: 98, outerW: 73, innerL: 92, innerW: 67 },
  { id: 'M5', name: '模具5', outerL: 98, outerW: 78.8, innerL: 92, innerW: 72.8 },
  { id: 'M6', name: '模具6', outerL: 100, outerW: 60, innerL: 94, innerW: 54 },
];

const OTHER_CONTAINERS = [
  { id: 'O1', name: '返修箱', type: 'REPAIR_BOX', standardL: 800, standardW: 600, standardH: 400, cost: 60, weight: 5 },
  { id: 'O2', name: '电视机蜂窝板', type: 'TV_HONEYCOMB', standardL: 1400, standardW: 200, standardH: 900, cost: 40, weight: 3 },
  { id: 'O3', name: '冰箱防损板', type: 'FRIDGE_BOARD', standardL: 1000, standardW: 1000, standardH: 2000, cost: 80, weight: 8 },
  { id: 'O4', name: '床垫袋', type: 'MATTRESS_BAG', standardL: 2000, standardW: 1800, standardH: 300, cost: 30, weight: 2 },
];

const PACKAGING_INTRO = [
  {
    name: '围板箱',
    desc: '高强度PP材质，抗压耐摔，可折叠循环使用50次以上。',
    image: 'https://picsum.photos/seed/box1/400/300',
    tags: ['高防护', '可折叠'],
    isNew: true
  },
  {
    name: '蜂窝板',
    desc: '轻量化蜂窝结构，优异的缓冲性能，适用于精密电子。',
    image: 'https://picsum.photos/seed/board1/400/300',
    tags: ['轻便', '抗震'],
    isNew: false
  },
  {
    name: '防损毯',
    desc: '加厚耐磨面料，全包裹设计，有效防止表面划伤。',
    image: 'https://picsum.photos/seed/blanket1/400/300',
    tags: ['防划伤', '柔性'],
    isNew: false
  },
  {
    name: '托盘',
    desc: '标准化底托，承重力强，便于叉车作业与堆码。',
    image: 'https://picsum.photos/seed/pallet1/400/300',
    tags: ['稳固', '易装卸'],
    isNew: false
  },
  {
    name: '返修箱',
    desc: '专为售后返修设计，坚固耐用，支持多次往返。',
    image: 'https://picsum.photos/seed/repair1/400/300',
    tags: ['售后专用', '高频'],
    isNew: true
  }
];

const FENGBAO_INTRO = [
  {
    name: '丰保箱',
    desc: '顺丰自研循环快递箱，采用环保PP材质，免胶带封箱设计，支持50次以上循环。',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400&h=300', // High quality box image
    tags: ['免胶带', '高耐用'],
    isNew: true
  }
];

// --- Components ---

const InputField = ({ label, value, onChange, type = 'number', suffix, placeholder, icon: Icon }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
      {Icon && <Icon size={12} className="text-blue-600" />}
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-300 font-mono shadow-sm"
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono font-bold">
          {suffix}
        </span>
      )}
    </div>
  </div>
);

const ResultCard = ({ title, value, unit, icon: Icon, color = "blue" }: any) => (
  <div className="bg-white border border-slate-100 p-5 rounded-xl flex items-start justify-between group hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all">
    <div className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">{title}</span>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-mono font-bold text-${color}-600`}>{value}</span>
        <span className="text-[10px] text-slate-400 font-mono font-bold">{unit}</span>
      </div>
    </div>
    <div className={`p-2.5 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-${color}-50 group-hover:text-${color}-600 transition-all`}>
      {Icon && <Icon size={18} />}
    </div>
  </div>
);

export default function App() {
  // --- State ---
  const [formData, setFormData] = useState({
    subject: '综合主题',
    object: '大件循环容器',
    mode: '内网',
    isSleeveBox: true,
    otherContainerId: '',
    length: '', // mm
    width: '',  // mm
    height: '', // mm
    customerRatio: '', 
    accountNumber: '',
    estimatedServiceFee: '',
    // New fields for 丰保箱
    purchasePrice: '',
    targetCycles: '',
    estimatedUsage: '',
  });

  // --- Calculations ---
  const recommendation = useMemo(() => {
    const l = Number(formData.length) / 10; // convert to cm
    const w = Number(formData.width) / 10;  // convert to cm
    const h = Number(formData.height) / 10; // convert to cm

    if (!l || !w || !h) return null;

    if (formData.isSleeveBox) {
      // Logic: Item must fit into Inner Dimensions
      // We assume height is adjustable for sleeve boxes, but let's check if it fits a reasonable range or just use outer dimensions for cost
      const matches = MOLDS.filter(m => m.innerL >= l && m.innerW >= w);
      
      if (matches.length > 0) {
        const bestMatch = matches[0];
        // Formulas from image:
        // Price: (L/100 + W/100) * 2 * 3 * 17.5
        // Weight: (L/100 + W/100) * 2 * 3 * (H/100 - 0.1)
        const cost = (bestMatch.outerL / 100 + bestMatch.outerW / 100) * 2 * 3 * 17.5;
        const weight = (bestMatch.outerL / 100 + bestMatch.outerW / 100) * 2 * 3 * (h / 100 - 0.1);
        
        return { 
          name: bestMatch.name, 
          isCustom: false, 
          cost, 
          weight: Math.max(0.5, weight), // Ensure weight is positive
          details: `外径: ${bestMatch.outerL}x${bestMatch.outerW} | 内径: ${bestMatch.innerL}x${bestMatch.innerW}`,
          loadingRate: ((l * w) / (bestMatch.innerL * bestMatch.innerW)) * 100
        };
      }

      // Custom Sleeve Box
      const customCost = (l / 100 + w / 100) * 2 * 3 * 25; // Higher rate for custom
      const customWeight = (l / 100 + w / 100) * 2 * 3 * (h / 100 - 0.05);
      return {
        name: '定制循环容器',
        isCustom: true,
        cost: customCost,
        weight: Math.max(1, customWeight),
        details: `根据托寄物尺寸定制: ${l}x${w}x${h}cm`
      };
    } else {
      // Other containers
      const selected = OTHER_CONTAINERS.find(c => c.id === formData.otherContainerId);
      if (selected) {
        const fits = selected.standardL >= l * 10 && selected.standardW >= w * 10 && selected.standardH >= h * 10;
        return { 
          ...selected, 
          isCustom: !fits, 
          details: fits ? `标准尺寸: ${selected.standardL}x${selected.standardW}x${selected.standardH}mm` : `尺寸超出标准范围: ${l*10}x${w*10}x${h*10}mm`,
          loadingRate: fits ? ((l * 10 * w * 10 * h * 10) / (selected.standardL * selected.standardW * selected.standardH)) * 100 : 95
        };
      }

      const matches = OTHER_CONTAINERS.filter(c => c.standardL >= l * 10 && c.standardW >= w * 10 && c.standardH >= h * 10);
      if (matches.length > 0) {
        const best = matches[0];
        return { 
          ...best, 
          isCustom: false, 
          details: `自动匹配标准尺寸: ${best.standardL}x${best.standardW}x${best.standardH}mm`,
          loadingRate: ((l * 10 * w * 10 * h * 10) / (best.standardL * best.standardW * best.standardH)) * 100
        };
      }
      return {
        name: '定制循环容器',
        isCustom: true,
        cost: (l * w * h) / 1000 * 0.5,
        weight: (l * w * h) / 1000 * 0.05,
        details: `非标尺寸定制`,
        loadingRate: 98
      };
    }
  }, [formData.length, formData.width, formData.height, formData.isSleeveBox, formData.otherContainerId]);

  const evaluation = useMemo(() => {
    if (formData.object === '丰保箱') {
      const price = Number(formData.purchasePrice) || 0;
      const cycles = Number(formData.targetCycles) || 0;
      const usage = Number(formData.estimatedUsage) || 0;
      
      if (!price || !cycles || !usage) return null;

      // Mock Score Calculation
      const score = Math.min(100, Math.round((cycles / 50 * 30) + (usage / 1000 * 40) + (price / 200 * 30)));
      
      let grade = '风险客户';
      let suggestion = '不予投入';
      let color = 'slate';

      if (score >= 90) {
        grade = '核心价值客户';
        suggestion = '优先投入';
        color = 'blue';
      } else if (score >= 75) {
        grade = '高价值客户';
        suggestion = '重点投入';
        color = 'emerald';
      } else if (score >= 60) {
        grade = '中等价值客户';
        suggestion = '有条件投入';
        color = 'indigo';
      } else if (score >= 40) {
        grade = '低价值客户';
        suggestion = '谨慎投入';
        color = 'amber';
      } else {
        grade = '风险客户';
        suggestion = '不予投入';
        color = 'rose';
      }

      const depreciation = price / cycles;
      const returnFee = (Number(formData.length) + Number(formData.width) + Number(formData.height)) / 100 * 2;
      const singleCharge = depreciation + returnFee + 5; // Mocked margin
      const grossProfit = singleCharge - depreciation - returnFee;
      const damageRate = (1 / cycles * 100).toFixed(1);
      const totalProfit = (price * 0.13 / cycles) + returnFee;

      return {
        type: 'FENGBAO',
        score,
        grade,
        suggestion,
        color,
        packaging: {
          price: price.toFixed(2),
          cycles: cycles.toString(),
        },
        income: {
          depreciation: depreciation.toFixed(2),
          returnFee: returnFee.toFixed(2),
          singleCharge: singleCharge.toFixed(2),
        },
        customer: {
          profit: grossProfit.toFixed(2),
          damageRate: damageRate + '%',
          grade: grade,
        },
        totalProfit: totalProfit.toFixed(2)
      };
    }

    if (!recommendation) return null;

    const serviceIncome = Number(formData.estimatedServiceFee) || 0;
    const damageReduction = (Number(formData.length) * Number(formData.width) * Number(formData.height) / 1000000) * 5;
    
    const usageFee = recommendation.cost * 0.15;
    const returnFee = recommendation.weight * 3.5;
    const courierCommission = serviceIncome * 0.08;

    return {
      packaging: {
        cost: recommendation.cost.toFixed(2),
        weight: recommendation.weight.toFixed(1),
        loadingRate: (recommendation as any).loadingRate?.toFixed(1),
      },
      income: {
        service: serviceIncome.toFixed(2),
        damage: damageReduction.toFixed(2),
      },
      support: {
        usage: usageFee.toFixed(2),
        return: returnFee.toFixed(2),
        commission: courierCommission.toFixed(2),
      },
      totalProfit: (serviceIncome + damageReduction - usageFee - returnFee - courierCommission).toFixed(2)
    };
  }, [recommendation, formData.estimatedServiceFee, formData.object, formData.purchasePrice, formData.targetCycles, formData.estimatedUsage, formData.length, formData.width, formData.height]);

  // --- Handlers ---
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-600 font-sans selection:bg-blue-500/10">
      {/* Header */}
      <header className="border-b border-slate-200 px-8 py-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <Package size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900">大件循环包装测算工具</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-mono font-bold">大件循环包装测算 v1.2</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">系统状态</span>
            <span className="text-xs text-blue-600 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              运行正常
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <Settings2 size={20} className="text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Configuration */}
        <div className="lg:col-span-5 space-y-8">
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-blue-600">
              <Settings2 size={16} strokeWidth={3} />
              <h2 className="text-xs font-black uppercase tracking-widest">基础配置</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                <span className="text-[10px] text-slate-400 uppercase block mb-1 font-bold">主题选择</span>
                <select 
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full text-sm font-bold text-slate-900 bg-transparent border-none focus:ring-0 p-0"
                >
                  <option value="综合主题">综合主题</option>
                  <option value="专项主题">专项主题</option>
                </select>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                <span className="text-[10px] text-slate-400 uppercase block mb-1 font-bold">投测对象</span>
                <select 
                  value={formData.object}
                  onChange={(e) => handleInputChange('object', e.target.value)}
                  className="w-full text-sm font-bold text-slate-900 bg-transparent border-none focus:ring-0 p-0"
                >
                  <option value="大件循环容器">大件循环容器</option>
                  <option value="丰保箱">丰保箱</option>
                </select>
              </div>
            </div>

            {/* Packaging Intro Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">大件循环包材介绍</span>
                <span className="text-[10px] text-blue-600 font-bold cursor-pointer hover:underline">查看详情</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {(formData.object === '丰保箱' ? FENGBAO_INTRO : PACKAGING_INTRO).map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="min-w-[160px] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm group hover:border-blue-300 transition-all cursor-pointer"
                  >
                    <div className="h-20 overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {item.isNew && (
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-lg">
                          NEW
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                        <span className="text-[8px] text-white font-bold">{item.tags.join(' · ')}</span>
                      </div>
                    </div>
                    <div className="p-2.5">
                      <h4 className="text-xs font-black text-slate-900 mb-1">{item.name}</h4>
                      <p className="text-[9px] text-slate-400 leading-tight line-clamp-2">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {formData.object === '大件循环容器' ? (
                <>
                  <div className="flex flex-col gap-4">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">容器类型选择</label>
                    <div className="grid grid-cols-2 gap-4 items-start">
                      <button
                        onClick={() => handleInputChange('isSleeveBox', true)}
                        className={`h-full px-4 py-8 rounded-2xl text-sm font-black transition-all flex flex-col items-center justify-center gap-4 border-2 ${
                          formData.isSleeveBox 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-[0_20px_40px_rgba(37,99,235,0.2)]' 
                            : 'bg-white text-slate-400 border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`p-4 rounded-2xl ${formData.isSleeveBox ? 'bg-white/20' : 'bg-slate-100'}`}>
                          <Box size={28} />
                        </div>
                        <div className="flex flex-col items-center">
                          <span>围板箱</span>
                          <span className={`text-[9px] uppercase tracking-widest mt-1 font-bold ${formData.isSleeveBox ? 'text-white/60' : 'text-slate-400'}`}>围板箱</span>
                        </div>
                      </button>

                      <div className="flex flex-col gap-4">
                        <button
                          onClick={() => handleInputChange('isSleeveBox', false)}
                          className={`w-full px-4 py-8 rounded-2xl text-sm font-black transition-all flex flex-col items-center justify-center gap-4 border-2 ${
                            !formData.isSleeveBox 
                              ? 'bg-blue-600 text-white border-blue-600 shadow-[0_20px_40px_rgba(37,99,235,0.2)]' 
                              : 'bg-white text-slate-400 border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`p-4 rounded-2xl ${!formData.isSleeveBox ? 'bg-white/20' : 'bg-slate-100'}`}>
                            <Package size={28} />
                          </div>
                          <div className="flex flex-col items-center">
                            <span>其他容器</span>
                            <span className={`text-[9px] uppercase tracking-widest mt-1 font-bold ${!formData.isSleeveBox ? 'text-white/60' : 'text-slate-400'}`}>其他类型</span>
                          </div>
                        </button>

                        <AnimatePresence>
                          {!formData.isSleeveBox && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, scale: 0.95 }}
                              animate={{ opacity: 1, height: 'auto', scale: 1 }}
                              exit={{ opacity: 0, height: 0, scale: 0.95 }}
                              className="overflow-hidden"
                            >
                              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-100 border border-slate-200 rounded-2xl">
                                {OTHER_CONTAINERS.map((container) => (
                                  <button
                                    key={container.id}
                                    onClick={() => handleInputChange('otherContainerId', container.id)}
                                    className={`px-2 py-4 rounded-xl text-[10px] font-black transition-all flex flex-col items-center justify-center gap-1 border ${
                                      formData.otherContainerId === container.id
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                        : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                                    }`}
                                  >
                                    <span>{container.name}</span>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <InputField 
                      label="长度 (L)" 
                      value={formData.length} 
                      onChange={(v: string) => handleInputChange('length', v)} 
                      suffix="mm" 
                      placeholder="0"
                    />
                    <InputField 
                      label="宽度 (W)" 
                      value={formData.width} 
                      onChange={(v: string) => handleInputChange('width', v)} 
                      suffix="mm" 
                      placeholder="0"
                    />
                    <InputField 
                      label="高度 (H)" 
                      value={formData.height} 
                      onChange={(v: string) => handleInputChange('height', v)} 
                      suffix="mm" 
                      placeholder="0"
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    {formData.isSleeveBox && (
                      <motion.div
                        key="sleeve-box-ratio"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <InputField 
                          label="客户抛比" 
                          value={formData.customerRatio} 
                          onChange={(v: string) => handleInputChange('customerRatio', v)} 
                          suffix="比例" 
                          placeholder="例如: 1:6000"
                          icon={ArrowRightLeft}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-2 gap-4">
                    <InputField 
                      label="月结账号" 
                      value={formData.accountNumber} 
                      onChange={(v: string) => handleInputChange('accountNumber', v)} 
                      type="text"
                      placeholder="账号 ID"
                      icon={User}
                    />
                    <InputField 
                      label="预估增值服务费" 
                      value={formData.estimatedServiceFee} 
                      onChange={(v: string) => handleInputChange('estimatedServiceFee', v)} 
                      suffix="元" 
                      placeholder="0.00"
                      icon={TrendingUp}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-4">
                    <InputField 
                      label="长度 (L)" 
                      value={formData.length} 
                      onChange={(v: string) => handleInputChange('length', v)} 
                      suffix="mm" 
                      placeholder="0"
                    />
                    <InputField 
                      label="宽度 (W)" 
                      value={formData.width} 
                      onChange={(v: string) => handleInputChange('width', v)} 
                      suffix="mm" 
                      placeholder="0"
                    />
                    <InputField 
                      label="高度 (H)" 
                      value={formData.height} 
                      onChange={(v: string) => handleInputChange('height', v)} 
                      suffix="mm" 
                      placeholder="0"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField 
                      label="月结账号" 
                      value={formData.accountNumber} 
                      onChange={(v: string) => handleInputChange('accountNumber', v)} 
                      type="text"
                      placeholder="账号 ID"
                      icon={User}
                    />
                    <InputField 
                      label="采购单价" 
                      value={formData.purchasePrice} 
                      onChange={(v: string) => handleInputChange('purchasePrice', v)} 
                      suffix="元" 
                      placeholder="0.00"
                      icon={Package}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField 
                      label="目标循环次数" 
                      value={formData.targetCycles} 
                      onChange={(v: string) => handleInputChange('targetCycles', v)} 
                      suffix="次" 
                      placeholder="0"
                      icon={ArrowRightLeft}
                    />
                    <InputField 
                      label="预估循环包材使用量" 
                      value={formData.estimatedUsage} 
                      onChange={(v: string) => handleInputChange('estimatedUsage', v)} 
                      suffix="个" 
                      placeholder="0"
                      icon={TrendingUp}
                    />
                  </div>
                </>
              )}
            </div>
          </section>

          <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-4">
            <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
              <span className="text-blue-600 font-black">提示:</span> 系统将根据输入的托寄物尺寸自动匹配标准模具内径。若无匹配尺寸，系统将自动切换至“定制循环容器”模式并开放审批。
            </p>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7 space-y-8">
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-600">
                <Calculator size={16} strokeWidth={3} />
                <h2 className="text-xs font-black uppercase tracking-widest">测算结果</h2>
              </div>
              {recommendation && (
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${recommendation.isCustom ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  {recommendation.isCustom ? '定制规格' : '标准规格'}
                </div>
              )}
            </div>

            {!evaluation ? (
              <div className="h-[450px] bg-white border border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-300 gap-6 shadow-inner">
                <Package size={64} strokeWidth={1} className="opacity-20" />
                <p className="text-sm font-mono font-bold">等待输入参数...</p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Recommendation Header */}
                {formData.object === '大件循环容器' ? (
                  <div className={`relative overflow-hidden border rounded-3xl p-10 transition-all ${
                    recommendation.isCustom 
                      ? 'bg-indigo-50 border-indigo-100 shadow-[0_20px_50px_rgba(79,70,229,0.1)]' 
                      : 'bg-emerald-50 border-emerald-100 shadow-[0_20px_50px_rgba(16,185,129,0.1)]'
                  }`}>
                    {/* Status Watermark */}
                    <div className="absolute -right-4 -top-8 opacity-[0.05] pointer-events-none select-none">
                      <h4 className="text-[140px] font-black uppercase leading-none italic">
                        {recommendation.isCustom ? '定制' : '标准'}
                      </h4>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="flex items-start gap-6">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                          recommendation.isCustom ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                        }`}>
                          {recommendation.isCustom ? <AlertCircle size={36} strokeWidth={2.5} /> : <CheckCircle2 size={36} strokeWidth={2.5} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
                              recommendation.isCustom ? 'bg-indigo-600/10 text-indigo-600' : 'bg-emerald-600/10 text-emerald-600'
                            }`}>
                              {recommendation.isCustom ? '需定制规格' : '匹配标准规格'}
                            </span>
                          </div>
                          <h3 className="text-4xl font-black text-slate-900 tracking-tight">{recommendation.name}</h3>
                          <p className="text-sm text-slate-500 font-mono mt-3 flex items-center gap-2 font-bold">
                            <Info size={14} className="text-slate-400" />
                            {recommendation.details}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        {recommendation.isCustom ? (
                          <div className="flex flex-col items-end gap-5">
                            <div className="flex items-center gap-8">
                              <div className="text-right">
                                <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1 font-bold">审批状态</span>
                                <span className="text-indigo-600 font-black flex items-center gap-2 justify-end">
                                  <Lock size={14} /> 需发起定制审批
                                </span>
                              </div>
                            </div>
                            <button 
                              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-[0_15px_30px_rgba(79,70,229,0.3)] active:scale-95"
                            >
                              发起审批定制
                              <ChevronRight size={18} strokeWidth={3} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-8">
                            {formData.isSleeveBox && evaluation?.packaging.loadingRate && (
                              <div className="text-right">
                                <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1 font-bold">装载率</span>
                                <span className="text-emerald-600 font-black flex items-center gap-2 justify-end">
                                  <TrendingUp size={14} /> {evaluation.packaging.loadingRate}%
                                </span>
                              </div>
                            )}
                            <div className="text-right">
                              <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1 font-bold">匹配状态</span>
                              <span className="text-emerald-600 font-black flex items-center gap-2 justify-end">
                                <CheckCircle2 size={18} /> 规格完全符合
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`relative overflow-hidden border rounded-3xl p-10 transition-all bg-${evaluation.color}-50 border-${evaluation.color}-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]`}>
                    <div className="absolute -right-4 -top-8 opacity-[0.05] pointer-events-none select-none">
                      <h4 className={`text-[140px] font-black uppercase leading-none italic text-${evaluation.color}-600`}>
                        {evaluation.score}
                      </h4>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="flex items-start gap-6">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg bg-${evaluation.color}-600 text-white`}>
                          <Calculator size={36} strokeWidth={2.5} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-${evaluation.color}-600/10 text-${evaluation.color}-600`}>
                              测算分值: {evaluation.score}
                            </span>
                          </div>
                          <h3 className="text-4xl font-black text-slate-900 tracking-tight">{evaluation.grade}</h3>
                          <p className="text-sm text-slate-500 font-mono mt-3 flex items-center gap-2 font-bold">
                            <TrendingUp size={14} className={`text-${evaluation.color}-600`} />
                            投入建议: <span className={`text-${evaluation.color}-600 font-black`}>{evaluation.suggestion}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Benefit Evaluation Table */}
                <div className="space-y-6">
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <TrendingUp size={14} strokeWidth={3} /> 效益评估计算表
                  </h3>
                  
                  {formData.object === '大件循环容器' ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Part 1: Packaging */}
                      <div className="space-y-4">
                        <div className="text-[10px] font-black text-slate-400 uppercase border-b border-slate-100 pb-2 tracking-widest">包材预测信息</div>
                        <ResultCard title="包材成本" value={evaluation?.packaging.cost} unit="元" icon={Calculator} color="blue" />
                        <ResultCard title="包材重量" value={evaluation?.packaging.weight} unit="KG" icon={Package} color="blue" />
                      </div>

                      {/* Part 2: Income */}
                      <div className="space-y-4">
                        <div className="text-[10px] font-black text-slate-400 uppercase border-b border-slate-100 pb-2 tracking-widest">收入信息</div>
                        <ResultCard title="增值服务收入" value={evaluation?.income.service} unit="元" icon={TrendingUp} color="emerald" />
                        <ResultCard title="降损减赔预估" value={evaluation?.income.damage} unit="元" icon={AlertCircle} color="emerald" />
                      </div>

                      {/* Part 3: Support */}
                      <div className="space-y-4">
                        <div className="text-[10px] font-black text-slate-400 uppercase border-b border-slate-100 pb-2 tracking-widest">支持信息</div>
                        <ResultCard title="使用费" value={evaluation?.support.usage} unit="元" icon={Settings2} color="indigo" />
                        <ResultCard title="回寄费" value={evaluation?.support.return} unit="元" icon={Truck} color="indigo" />
                        <ResultCard title="小哥计提费" value={evaluation?.support.commission} unit="元" icon={User} color="indigo" />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Part 1: Packaging Info */}
                      <div className="space-y-4">
                        <div className="text-[10px] font-black text-slate-400 uppercase border-b border-slate-100 pb-2 tracking-widest">包材信息</div>
                        <ResultCard title="采购单价" value={evaluation?.packaging.price} unit="元" icon={Calculator} color="blue" />
                        <ResultCard title="目标循环次数" value={evaluation?.packaging.cycles} unit="次" icon={ArrowRightLeft} color="blue" />
                      </div>

                      {/* Part 2: Income Info */}
                      <div className="space-y-4">
                        <div className="text-[10px] font-black text-slate-400 uppercase border-b border-slate-100 pb-2 tracking-widest">收入信息</div>
                        <ResultCard title="折旧费" value={evaluation?.income.depreciation} unit="元" icon={TrendingUp} color="emerald" />
                        <ResultCard title="回寄费" value={evaluation?.income.returnFee} unit="元" icon={Truck} color="emerald" />
                        <ResultCard title="单次收费金额" value={evaluation?.income.singleCharge} unit="元" icon={Calculator} color="emerald" />
                      </div>

                      {/* Part 3: Customer Info */}
                      <div className="space-y-4">
                        <div className="text-[10px] font-black text-slate-400 uppercase border-b border-slate-100 pb-2 tracking-widest">客户信息</div>
                        <ResultCard title="毛利" value={evaluation?.customer.profit} unit="元" icon={TrendingUp} color="indigo" />
                        <ResultCard title="损坏率" value={evaluation?.customer.damageRate} unit="" icon={AlertCircle} color="indigo" />
                      </div>
                    </div>
                  )}

                  {/* Final Summary */}
                  {evaluation?.totalProfit && (
                    <div className="mt-10 bg-blue-600 p-8 rounded-3xl flex items-center justify-between group cursor-pointer hover:scale-[1.01] transition-all shadow-[0_30px_60px_rgba(37,99,235,0.2)]">
                      <div className="text-white">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-70">预估单票净收益</span>
                        <div className="flex items-baseline gap-3 mt-1">
                          <span className="text-5xl font-mono font-black">¥ {evaluation?.totalProfit}</span>
                          <span className="text-xs font-black opacity-80">单票</span>
                        </div>
                      </div>
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white group-hover:translate-x-2 transition-transform">
                        <ChevronRight size={32} strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-6 pt-6">
                  <button className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                    投测复盘
                  </button>
                </div>
              </motion.div>
            )}
          </section>
        </div>
      </main>

      {/* Background Grid Accent */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-radial-gradient from-blue-500/[0.03] via-transparent to-transparent" />
      </div>
    </div>
  );
}
